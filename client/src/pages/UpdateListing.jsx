import { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function UpdateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    brand: "",
    type: "",
    color: "",
    description: "",
    year: "",
    condition: "",
    fuelType: "",
    wheelControl: "",
    horsePower: "",
    transmission: "automatic",
    seats: 1,
    price: 1000000,
  });
  console.log(formData);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);

  const handleImageSubmit = (e) => {
    console.log(e);
    if (files.length > 0 && files.length + formData.imageUrls.length < 11) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          console.log(error);
          setImageUploadError("Image upload failed (3 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 10 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.type === "radio") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.id,
      });
    }

    // if (
    //   e.target.id === "parking" ||
    //   e.target.id === "furnished" ||
    //   e.target.id === "offer"
    // ) {
    //   setFormData({
    //     ...formData,
    //     [e.target.id]: e.target.checked,
    //   });
    // }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }

    // For the new select input (wheelControl and fuelType)
    if (e.target.tagName === "SELECT") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      //   if (+formData.regularPrice < +formData.discountPrice)
      //     return setError("Discount price must be lower than regular price");
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      toast.success("Listing Updated successfully!");
      navigate(`/listing/${data._id}`);
    } catch (error) {
      toast.error("Error Updating Listing!");
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Update Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="200"
            minLength="5"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <input
            type="text"
            placeholder="Brand"
            className="border p-3 rounded-lg"
            id="brand"
            maxLength="100"
            minLength="3"
            required
            onChange={handleChange}
            value={formData.brand}
          />
          <input
            type="text"
            placeholder="Color"
            className="border p-3 rounded-lg"
            id="color"
            maxLength="100"
            minLength="3"
            required
            onChange={handleChange}
            value={formData.color}
          />
          <input
            type="text"
            placeholder="Year of Production"
            className="border p-3 rounded-lg"
            id="year"
            maxLength="8"
            minLength="4"
            required
            onChange={handleChange}
            value={formData.year}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <div className="flex flex-col gap-4">
            <label htmlFor="wheelControl" className="font-semibold">
              Fuel Type:
            </label>
            <select
              id="fuelType"
              className="border p-3 rounded-lg"
              onChange={handleChange}
              value={formData.fuelType}
              required
            >
              <option value="" disabled>
                Select Fuel Type
              </option>
              <option value="Petrol">Petrol</option>
              <option value="Gasoline">Gasoline</option>
              <option value="Electricity">Electricity</option>
            </select>
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="wheelControl" className="font-semibold">
              Wheel Control:
            </label>
            <select
              id="wheelControl"
              className="border p-3 rounded-lg"
              required
              onChange={handleChange}
              value={formData.wheelControl}
            >
              <option value="" disabled>
                Select wheel control
              </option>
              <option value="FWD">Front-wheel drive (FWD)</option>
              <option value="RWD">Rear-wheel drive (RWD)</option>
              <option value="4WD">Four-wheel drive (4WD)</option>
              <option value="AWD">All-wheel drive (AWD)</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Horse Power"
            className="border p-3 rounded-lg"
            id="horsePower"
            required
            onChange={handleChange}
            value={formData.horsePower}
          />
          <div className="flex gap-6 flex-wrap">
            {/* Condition */}
            <div className="flex gap-2">
              <input
                type="radio"
                id="new"
                name="condition"
                className="w-5"
                onChange={handleChange}
                checked={formData.condition === "new"}
              />
              <span>Brand New</span>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                id="used"
                name="condition"
                className="w-5"
                onChange={handleChange}
                checked={formData.condition === "used"}
              />
              <span>Direct Belgium</span>
            </div>

            {/* Type  */}
            <div className="flex gap-2">
              <input
                type="radio"
                id="suv"
                name="type"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "suv"}
              />
              <span>SUV</span>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                id="sedan"
                name="type"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sedan"}
              />
              <span>Sedan</span>
            </div>

            {/* Transmission */}
            <div className="flex gap-2">
              <input
                type="radio"
                id="automatic"
                name="transmission"
                className="w-5"
                onChange={handleChange}
                checked={formData.transmission === "automatic"}
              />
              <span>Automatic</span>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                id="manual"
                name="transmission"
                className="w-5"
                onChange={handleChange}
                checked={formData.transmission === "manual"}
              />
              <span>Manual</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="seats"
                min="1"
                max="20"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.seats}
              />
              <p>Seats</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="price"
                min="1000000"
                max="100000000000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.price}
              />
              <div className="flex flex-col items-center">
                <p>Price</p>

                <span className="text-xs">(₦)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 10)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Updating..." : "Update listing"}
          </button>
          {/* {error && <p className="text-red-700 text-sm">{error}</p>} */}
        </div>
      </form>
    </main>
  );
}
