import bgImage from "./images/gundam.jpg"
import documentBitCoin from "./pdfs/bitcoin.pdf"

const domImageAndPdf = () => {
  const body = document.body;

  body.style.backgroundImage = `url(${bgImage})`;

  const link = document.createElement("a");

  link.href = documentBitCoin
  link.target = "_blank"

  link.textContent = "Bitcoin document"

  body.appendChild(link)
}

export default domImageAndPdf