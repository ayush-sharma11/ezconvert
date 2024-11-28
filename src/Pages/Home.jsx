import { useState, useRef } from "react";
import { CircleCheckBig } from "lucide-react";

const Home = () => {
    const [previewSrc, setPreviewSrc] = useState("");
    const [originalFile, setOriginalFile] = useState(null);
    const [originalFileName, setOriginalFileName] = useState("");
    const [format, setFormat] = useState("jpeg");
    const [resizeWidth, setResizeWidth] = useState("");
    const downloadLinkRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setOriginalFile(file);
            setOriginalFileName(file.name.split(".")[0]); // Extract the name without extension
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewSrc(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleConvert = () => {
        if (!originalFile) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                // Create canvas
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                // Handle optional resizing
                const targetWidth = resizeWidth
                    ? parseInt(resizeWidth, 10)
                    : img.width;
                const scaleFactor = targetWidth / img.width;
                const targetHeight = Math.round(img.height * scaleFactor);

                // Set canvas dimensions
                canvas.width = targetWidth;
                canvas.height = targetHeight;

                // Draw resized image
                ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

                // Get conversion parameters
                const mimeType = `image/${format}`;

                // Convert to data URL
                const convertedDataUrl = canvas.toDataURL(mimeType);

                // Setup download
                if (downloadLinkRef.current) {
                    downloadLinkRef.current.href = convertedDataUrl;
                    downloadLinkRef.current.download = `${originalFileName}.${format}`; // Use original name with new extension
                    downloadLinkRef.current.style.display = "block";
                }
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(originalFile);
    };

    return (
        <>
            <header className="header-gradient text-center py-5">
                <div className="container">
                    <h1 className="display-4 mb-3">
                        Convert Images Effortlessly
                    </h1>
                    <p className="lead mb-4">
                        Professional image conversion at your fingertips
                    </p>
                    <div className="d-flex justify-content-center align-items-center mb-3">
                        <CircleCheckBig className="me-2" />
                        <span>
                            Supported formats: JPEG, PNG, WEBP, and more
                        </span>
                    </div>
                </div>
            </header>
            <div className="container my-5 py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 d-flex justify-content-center">
                        <div className="conversion-card my-3">
                            <form id="converterForm">
                                <div className="mb-3">
                                    <label
                                        htmlFor="imageInput"
                                        className="form-label"
                                    >
                                        Upload Image
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <img
                                        id="preview"
                                        src={previewSrc}
                                        alt="Preview"
                                        style={{
                                            display: previewSrc
                                                ? "block"
                                                : "none",
                                            maxWidth: "100%",
                                            margin: "10px auto",
                                        }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="formatSelect"
                                        className="form-label"
                                    >
                                        Output Format
                                    </label>
                                    <select
                                        className="form-select"
                                        id="formatSelect"
                                        value={format}
                                        onChange={(e) =>
                                            setFormat(e.target.value)
                                        }
                                        required
                                    >
                                        <option value="png">PNG</option>
                                        <option value="jpeg">JPEG</option>
                                        <option value="webp">WEBP</option>
                                        <option value="enc">ENC</option>
                                        <option value="gif">GIF</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="resizeWidth"
                                        className="form-label"
                                    >
                                        Resize Width (optional)
                                    </label>
                                    <input
                                        type="number"
                                        value={resizeWidth}
                                        onChange={(e) =>
                                            setResizeWidth(e.target.value)
                                        }
                                        className="form-control"
                                        id="resizeWidth"
                                        placeholder="Enter width"
                                    />
                                </div>
                                <img
                                    id="preview"
                                    className="img-fluid mb-3"
                                    alt
                                />
                                <button
                                    type="button"
                                    id="convertBtn"
                                    className="btn btn-primary w-100 mt-3"
                                    onClick={handleConvert}
                                    disabled={!originalFile}
                                    style={{
                                        cursor: originalFile
                                            ? "pointer"
                                            : "not-allowed",
                                    }}
                                >
                                    Convert Image
                                </button>
                                <a
                                    ref={downloadLinkRef}
                                    id="downloadLink"
                                    className="btn btn-success w-100 mt-3"
                                >
                                    Download Converted Image
                                </a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
