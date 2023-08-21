
import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FirebaseContext, AuthContext } from "../../store/Context";

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [fname, setFname] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const history = useHistory();
  const date = new Date();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = () => {
    if (!fname || !category || !price || !image) {
      setError("Please fill in all fields and select an image.");
      return;
    }

    firebase
      .storage()
      .ref(`/images/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          const productData = {
            name: fname,
            category,
            price,
            url,
            userId: user.uid,
            createdAt: date.toDateString(),
          };

          return firebase.firestore().collection("products").add(productData);
        });
      })
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        setError("Error uploading the product: " + error.message);
      });
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <h3>Add a Selling Item</h3>
        <label htmlFor="fname">Name</label>
        <br />
        <input
          className="input"
          type="text"
          id="fname"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          name="Name"
        />
        <br />
        <label htmlFor="category">Category</label>
        <br />
        <input
          className="input"
          type="text"
          id="category"
          value={category}
          name="category"
          onChange={(e) => {
            const inputValue = e.target.value;
            // Check if the input value contains any numbers
            if (!/\d/.test(inputValue)) {
              setCategory(inputValue); // Update the state only if there are no numbers
            }
          }}
        />

        <br />
        <label htmlFor="price">Price</label>
        <br />
        <input
          className="input"
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          name="Price"
        />
        <br />
        <label htmlFor="image">Image</label>
        <br />
        <input onChange={handleImageChange} type="file" accept="image/*" />
        {image && (
          <div className="image-preview">
            <img
              src={URL.createObjectURL(image)}
              alt="Selected"
              width="90px"
              height="90px"
              className="preview-image"
            />
          </div>
        )}
        {!image && (
          <div className="thumbnail-placeholder">
            <span>No image selected</span>
          </div>
        )}
        <div className="error-message">{error}</div>
        <br />
        <button onClick={handleSubmit} className="uploadBtn">
          Upload and Submit
        </button>
      </div>
    </Fragment>
  );
};

export default Create;
