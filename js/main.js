const uploadBox = document.querySelector(".upload-box");
const previewImg = uploadBox.querySelector("img");
const fileInput = uploadBox.querySelector("input");
const widthInput = document.querySelector(".width input");
const heightInput = document.querySelector(".height input");
const ratioInput = document.querySelector(".ratio input");
const qualityInput = document.querySelector(".quality input");
const downloadBtn = document.querySelector(".download-btn");
const wrapper = document.querySelector(".wrapper");
let ogImageRatio;
let LoadImg = (e) => {
  const file = e.target.files[0];

  if (!file) return;
  previewImg.src = URL.createObjectURL(file);
  console.log(previewImg.src);
  previewImg.addEventListener("load", () => {
    widthInput.value = previewImg.naturalWidth;
    heightInput.value = previewImg.naturalHeight;
    ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
    wrapper.classList.add("active");
  });
};

widthInput.addEventListener("keyup", () => {
  const height = ratioInput.checked
    ? widthInput.value / ogImageRatio
    : heightInput.value;
  heightInput.value = Math.floor(height);
});

heightInput.addEventListener("keyup", () => {
  const width = ratioInput.checked
    ? heightInput.value / ogImageRatio
    : widthInput.value;
  widthInput.value = Math.floor(width);
});

const DownloadResize = () => {
  let canvas = document.createElement("canvas");
  let a = document.createElement("a");
  let GetTC = canvas.getContext("2d");

  let imageQuality = qualityInput.checked ? 0.7 : 1.0;
  canvas.width = widthInput.value;
  canvas.height = heightInput.value;
  GetTC.drawImage(previewImg, 0, 0, canvas.width, canvas.height);

  a.href = canvas.toDataURL("img/png", imageQuality);
  a.download = new Date().getTime();
  a.click();
};

downloadBtn.addEventListener("click", DownloadResize);
fileInput.addEventListener("change", LoadImg);
uploadBox.addEventListener("click", () => fileInput.click());
