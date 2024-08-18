import { useState } from "react";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css'; 
import { Document, Page,pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
function PdfComp({pdf}) {
  const [numPages, setNumPages] = useState(null);

  // Function to set the number of pages
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  return (
    <div className="pdf-div">
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess} size='A4'>
      {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1}  />
        ))}
      </Document>
   
    </div>
  );
}
export default PdfComp;