import React, { useState } from "react";

interface Props {
  type: "avatar" | "frontIdCard" | "backIdCard" | "temporaryResidence";
  selectedImage: File | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
  imageUrl?: string;
}

const RenderUploadField: React.FC<Props> = ({
  type,
  selectedImage,
  setSelectedImage,
  imageUrl,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };
  // Mở modal để xem ảnh lớn hơn
  const handleImageClick = () => {
    if (selectedImage) {
      setIsModalOpen(true);
    }
  };
  // Đóng modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const inputId = `image-upload-${type}`;

  return (
    <div className="flex justify-between my-4">
      <div
        className={`relative ${
          type === "avatar" ? "w-32 h-32" : "w-[210px] h-[150px]"
        }
        `}
      >
        <p>
          {type === "avatar"
            ? null
            : type === "frontIdCard"
            ? "Front ID Card"
            : type === "backIdCard"
            ? "Back ID Card"
            : "Temporary Residence"}
        </p>
        {/* Vòng chứa ảnh */}
        <div
          className={`w-full h-full ${
            type === "avatar" ? "rounded-full" : "rounded-lg"
          } overflow-hidden border border-gray-300 bg-gray-200 flex items-center justify-center`}
        >
          {selectedImage ? (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="w-full h-full object-cover cursor-pointer"
              onClick={handleImageClick} // Xử lý khi nhấp vào ảnh
            />
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt="Selected"
              className="w-full h-full object-cover cursor-pointer"
              onClick={handleImageClick} // Xử lý khi nhấp vào ảnh
            />
          ) : (
            <i
              className={`fa ${
                type === "avatar"
                  ? "fa-user-circle text-6xl"
                  : type === "frontIdCard" || type === "backIdCard"
                  ? "fa-id-card text-4xl"
                  : "fa-file-contract text-4xl"
              } text-gray-400`}
            ></i>
          )}
        </div>

        {/* Biểu tượng máy ảnh để chọn ảnh */}
        <label htmlFor={inputId}>
          <div className="absolute bottom-0 right-0 bg-gray-800 p-1 rounded-full">
            <i className="fa fa-camera text-white p-2"></i>
          </div>
        </label>
        <input
          id={inputId}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </div>

      {/* Modal để hiển thị ảnh lớn hơn */}
      {/* {isModalOpen
        ? selectedImage && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="relative bg-white p-4 rounded-lg max-w-lg">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Large Selected"
                  className="w-full h-auto object-cover rounded-lg"
                />
                <button
                  onClick={handleCloseModal}
                  className="absolute top-2 right-2 px-3 py-1 text-white bg-gray-800  rounded-full"
                >
                  X
                </button>
              </div>
            </div>
          )
        : imageUrl && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="relative bg-white p-4 rounded-lg max-w-lg">
                <img
                  src={imageUrl}
                  alt="Large Selected"
                  className="w-full h-auto object-cover rounded-lg"
                />
                <button
                  onClick={handleCloseModal}
                  className="absolute top-2 right-2 px-3 py-1 text-white bg-gray-800  rounded-full"
                >
                  X
                </button>
              </div>
            </div>
          )} */}
    </div>
  );
};

export default RenderUploadField;
