import React from "react";
import { useState } from "react";
import "./styles.css";
import { dataLayer } from "dataLayer";

// Props are short for properties, and they are used to pass data from a parent component to a child component. In this code, the parent component is YoutubeForm, and it is passing data as props to the child components UrlInput, TitleInput, DescriptionInput, and TagsInput. For example, the UrlInput component is being passed the value of the url state variable and the function setUrl as props. This allows the child component to access and update the value of the url state variable.

// State, on the other hand, is used to manage and store data within a component. It represents the internal state of a component and can be updated using setState or useState hook in functional components. In this code, the state variables url, title, description, and tags are being managed using the useState hook. Whenever the state of one of these variables changes, the component is re-rendered to reflect the new state.
function YoutubeForm() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [urlError, setUrlError] = useState({});
  const [titleError, setTitleError] = useState({});
  const [descriptionError, setDescriptionError] = useState({});
  const [tagsError, setTagsError] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    const isValid = formValidation();
    if (isValid) {
      console.log("Form submitted");
      // Add the form data to the data layer
      dataLayer.push({
        event: "formSubmission",
        eventCategory: "Form",
        eventAction: "Submission",
        eventLabel: "YouTube Form",
        formUrl: url,
        formTitle: title,
        formDescription: description,
        formTags: tags,
      });
      // Reset the form
      setUrl("");
      setTitle("");
      setDescription("");
      setTags("");
    }
  }

  function formValidation() {
    const urlError = {};
    const titleError = {};
    const descriptionError = {};
    const tagsError = {};
    let isValid = true;

    if (url.trim().length < 10) {
      urlError.urlShort = "URL is too short";
      isValid = false;
    }

    if (title.trim().length < 5) {
      titleError.titleShort = "Title is too short";
      isValid = false;
    }

    if (description.trim().length < 20) {
      descriptionError.descriptionShort = "Description is too short";
      isValid = false;
    }

    if (tags.trim().length < 3) {
      tagsError.tagsShort = "Tags are too short";
      isValid = false;
    }

    setUrlError(urlError);
    setTitleError(titleError);
    setDescriptionError(descriptionError);
    setTagsError(tagsError);

    return isValid;
  }

  return (
    <form onSubmit={handleSubmit}>
      <UrlInput url={url} setUrl={setUrl} urlError={urlError} />
      <TitleInput title={title} setTitle={setTitle} titleError={titleError} />
      <DescriptionInput
        description={description}
        setDescription={setDescription}
        descriptionError={descriptionError}
      />
      <TagsInput tags={tags} setTags={setTags} tagsError={tagsError} />
      <Button />
    </form>
  );
}

// Create child components for each form field (UrlInput, TitleInput, DescriptionInput, TagsInput).
// The child components should receive the state variable and the setter function as props.
function Button() {
  return <button>Submit</button>;
}

function UrlInput({ url, setUrl }) {
  return (
    <div>
      <label htmlFor="url">URL</label>
      <input
        type="text"
        name="url"
        id="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
    </div>
  );
}

function TitleInput({ title, setTitle }) {
  return (
    <div>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
}

function DescriptionInput({ description, setDescription }) {
  return (
    <div>
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
  );
}

function TagsInput({ tags, setTags }) {
  return (
    <div>
      <label htmlFor="tags">Tags</label>
      <input
        type="text"
        name="tags"
        id="tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
    </div>
  );
}

const App = () => {
  return (
    <div>
      <h1>React App</h1>
      <YoutubeForm />
    </div>
  );
};

export default App;
