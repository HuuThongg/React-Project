import {
  Link,
  Outlet,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
  useSubmit
} from "react-router-dom";
import { getContacts, createContact } from "../contacts";
import { useEffect } from "react";
export default function Root() {

  const {contacts, q} = useLoaderData();

  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");
    console.log(searching);
  useEffect(()=>{
    document.getElementById('q').value=q;
  },[q])
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              // That solves problem (2). If you refresh the page now, the input field will show the query.
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                // We only want to replace search results, not the page before we started searching, so we do a quick check if this is the first search or not and then decide to replace.

// Each key stroke no longer creates new entries, so the user can click back out of the search results without having to click it 7 times 😅.
                submit(event.currentTarget.form ,{
                  replace: !isFirstSearch
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet></Outlet>
      </div>
    </>
  );
}

// As we've seen before, browsers can serialize forms by the name attribute of it's input elements. The name of this input is q, that's why the URL has ?q=. If we named it search the URL would be ?search=.
// Because this is a GET, not a POST, React Router does not call the action. Submitting a GET form is the same as clicking a link: only the URL changes. That's why the code we added for filtering is in the loader, not the action of this route.
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts,q };
}

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}