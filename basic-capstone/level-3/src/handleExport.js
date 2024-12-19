// handleExport.js
import JSZip from "jszip";

export function exportFilteredData(papers) {
  const zip = new JSZip();
  zip.file("filtered_papers.json", JSON.stringify(papers, null, 2));
  zip.generateAsync({ type: "blob" }).then(function (content) {
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = "filtered_papers.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}
