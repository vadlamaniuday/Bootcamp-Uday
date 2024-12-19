import JSZip from "jszip";

export function handleExport(data) {
  const zip = new JSZip();
  zip.file("filtered_data.json", JSON.stringify(data, null, 2));
  zip.generateAsync({ type: "blob" }).then(function (content) {
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = "filtered_data.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}
