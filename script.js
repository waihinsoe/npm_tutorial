const handleFileUpload = async () => {
  const inputTag = document.querySelector("#fileUpload");
  console.log(inputTag.files);
  const respone = await fetch("http://localhost:5500/fileUpload", {
    method: "POST",
    body: inputTag.files[0],
  });
  console.log(await respone.json());
};
