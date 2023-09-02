import axios from 'axios';
import React from 'react';
import { FaDownload } from 'react-icons/fa'; // You may need to install the 'react-icons/fa' package
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
const AgGridDownload = (props) => {
    // Add your logic here to handle the download action when the icon is clicked
    console.log(props);
    const url = process.env.REACT_APP_SERVICE_ID


    const handleDownloadClick = () => {
        axios.post(url + 'downloadInvoice', props.param.data).then((res) => {
            if (res.status === 200) {
                const doc = new jsPDF();

          
                  const htmlContent=res.data
             

                const options = {
                    callback: (pdf) => {
                      // Save the PDF as a blob
                      const blob = pdf.output('blob');
                  
                      // Create a download link
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'template.pdf';
                  
                      // Trigger a click event to start the download
                      a.click();
                  
                      // Clean up
                      URL.revokeObjectURL(url);
                    },
                    x: 5, // Adjust the X-position (horizontal) where the content starts on the page
                    y: 10, // Adjust the Y-position (vertical) where the content starts on the page
                    html2canvas: { scale: 0.13 }, // Adjust the scale to fit content properly
                  };
                  
                  // Add the HTML content to the PDF with the specified options
                  doc.html(htmlContent, options);
                 





            }

        })

    }


    return (
        <div>

            <button onClick={handleDownloadClick}>
                <FaDownload />
            </button>
        </div>
    );
};

export default AgGridDownload;
