const qs = (selector) => document.querySelector(selector);
const question = qs(".question");
const gif = qs(".gif");
const [yesBtn, noBtn] = [".yes-btn", ".no-btn"].map(qs);

const handleYesClick = () => {
  question.innerHTML = "Yeaayyyyyy!, Ayo pilih mau bukber dimanaa..";
  gif.src = "https://media.giphy.com/media/UMon0fuimoAN9ueUNP/giphy.gif";

  // Remove the 'mouseover' event listener from noBtn
  noBtn.removeEventListener("mouseover", handleNoMouseOver);

  // Remove the noBtn from the DOM
  noBtn.remove();

  // Create and style a new button for Let's Go!
  const letsGoBtn = document.createElement("button");
  letsGoBtn.textContent = "Let's Go!";
  letsGoBtn.classList.add("letsgo-btn"); // You can add a class for styling if needed
  letsGoBtn.style.position = "absolute";

  // Adjust the left position based on screen width
  if (window.innerWidth <= 800) {
    letsGoBtn.style.left = "95%";
  } else {
    letsGoBtn.style.left = "63%";
  }

  letsGoBtn.style.transform = "translate(-50%, -50%)";
  letsGoBtn.style.width = "200px"; // Adjust the width as needed

  // Add a click event listener to open a new tab with date ideas
  letsGoBtn.addEventListener("click", openDateIdeasTab);

  // Replace yesBtn with the new letsGoBtn
  yesBtn.replaceWith(letsGoBtn);
};

const handleNoMouseOver = () => {
  const { width, height } = noBtn.getBoundingClientRect();
  const maxX = window.innerWidth - width;
  const maxY = window.innerHeight - height;

  noBtn.style.left = `${Math.floor(Math.random() * maxX)}px`;
  noBtn.style.top = `${Math.floor(Math.random() * maxY)}px`;
};

yesBtn.addEventListener("click", handleYesClick);
noBtn.addEventListener("mouseover", handleNoMouseOver);

const dateIdeas = [
  "Solaria",
  "All You Can Eat",
  "Cabe Merah",
  "Rm Padang",
  "Bukber Di Langkah Kanan Cafe",
  "Bundaran Keris",
  "Abu Darda",
  "Halaman Unri",
  "Kafe Malabar",
  "Starbucks",
  "Waroeng Steak",
];

// Fungsi untuk membuka tab baru dengan ide acara
function openDateIdeasTab() {
  // Membuat HTML untuk halaman ide acara
  const htmlContent = `
  <html>
    <head>
      <title>Pilih We...!</title>
      <style>
        body {
          font-family: 'Leckerli One', cursive;
          text-align: center;
          padding: 20px;
          background-color: rgb(246, 211, 217);
        }
        h2 {
          color: #e94d58;
        }
        button {
          margin: 10px;
          padding: 10px;
          font-size: 1.2em;
          border-radius: 10px;
          cursor: pointer;
          background: #e94d58;
          color: white;
          border: none;
          outline: none;
        }
      </style>
    </head>
    <body>
      <img src="https://media.giphy.com/media/UMon0fuimoAN9ueUNP/giphy.gif" />

      <h2>Hayo Pilih Mau Kemana..</h2>
      ${dateIdeas.map((idea, index) => `
        <button onclick="selectDateIdea(${index})">${idea}</button>
      `).join('')}
      <script>
        function selectDateIdea(index) {
          const dateIdeas = ${JSON.stringify(dateIdeas)};
          const selectedDateIdea = dateIdeas[index];
          const alertMessage = "Okee kalau kamu pilih Bukber Di: " + selectedDateIdea + ", ScreenShot Pop Up ini Kasih Ke Aku yaa.. See you Cantik :) ";
          alert(alertMessage);
        }
      </script>
    </body>
  </html>
`;

  // Membuat Blob dari HTML
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const blobURL = URL.createObjectURL(blob);

  // Membuka tab baru dengan tautan ke halaman ide acara
  window.open(blobURL, '_blank');
}
