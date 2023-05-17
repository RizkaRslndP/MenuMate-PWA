class FooterContact extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const FooterContactHtml = `
        <style>
        footer {
          bottom: 0;
          left: 0;
          background-color: #333;
          padding: 5px;
          text-align: center;
        }

      .footer-content {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        max-width: 100%;
        border-radius: 5px;
        background-color: rgb(145, 126, 87);
      }

      .footer-content h3 {
        font-size: 20px;
        margin-bottom: 10px;
        color: rgba(0, 0, 0, 0.9);
        text-align: center;
      }

      .social-icons ul {
        display: flex;
        flex-direction: row;
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .social-icons img {
        width: 70px;
        height: 60px;
        object-fit: cover;
      }

      .social-icons img:hover {
        transform: scale(1.1);
      }

      .social-icons li {
        margin-top: 10px;
      }

      .social-icons a {
        display: inline-block;
        padding: 10px;
      }

      .email-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 500px;
      }

      .email-form h3 {
        font-size: 20px;
        margin-bottom: 10px;
        color: rgba(0, 0, 0, 0.9);
      }

      .email-form input[type='email'],
      .email-form textarea {
        padding: 15px;
        margin-bottom: 10px;
        border-radius: 5px;
        border: none;
        background: rgba(255, 255, 255, 0.65);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(3.4px);
        -webkit-backdrop-filter: blur(3.4px);
      }

      .email-form textarea {
        height: 100px;
        resize: none;
      }

      .tombol-sub {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100px;
        height: 40px;
        border: none;
        padding: 0px 25px;
        border: 2px solid #333;
        background-color: rgb(145, 126, 87);
        font-weight: 500;
        cursor: pointer;
        border-radius: 10px;
        box-shadow: 2px 5px 0px #333;
        transition-duration: .3s;
        margin: 10px;
      }

      .tombol-sub a {
        text-decoration: none;
        font-size: medium;
        color: #e4e4e4;
      }
      
      .tombol-sub:hover {
        color: transparent;
      }
      
      .tombol-sub:active {
        transform: translate(3px , 3px);
        transition-duration: .3s;
        box-shadow: 2px 2px 0px rgb(202, 202, 202);
      }

      .email-form button[type='submit']:hover {
        background-color: #BD8729;
      }

      .footer-content, {
        max-width: 960px;
        margin: 0 auto;
      }

      .copyright {
        max-width: auto;
        margin: 0 auto;
        background-color: #333;
      }

      .copyright a, .copyright p {
        font-size: 16px;
        font-family: 'Roboto', serif;
        font-weight: 400;

      }

      .copyright a {
        text-decoration: none;
        padding: 15px;
        margin-left: -15px;
        color: #e4e4e4;
      }

      .copyright a:hover {
        color: rgb(145, 126, 87);
      }

      .footer-content {
        margin-bottom: 20px;
      }

      p {
        font-size: 16px;
        text-align: center;
        color: rgb(145, 126, 87);
      }

      button, a, input[type='text'], textarea {
        min-width: 44px;
        min-height: 44px;
        padding: 10px;
      }


      @media screen and (max-width: 768px) {
        .footer-content {
          flex-direction: row;
          align-items: center;
        }
      }

      @media screen and (max-width: 360px) {
        .footer-content {
          flex-direction: row;
          align-items: center;
        }
        .social-icons ul {
          display: flex;
          align-item: center;
          margin-left: 10px;
        }
        .social-icons img {
          display: flex;
          justify-content: center;
          width: 50px;
          height: 50px;
        }
        p {
          font-size: 12px;
        }
      }
      </style>
      <footer>
      <div id='about' class='footer'>
      <div class='footer-content'>
      <div class='social-icons'>
        <h3>Follow Us</h3>
        <ul>
          <li><a href='https://github.com/RizkaRslndP' target='_blank'><img src='https://img.icons8.com/sf-black-filled/64/null/github.png' alt='Info to GitHub'></a></li>
          <li><a href='https://www.instagram.com/rzkrslndp/' target='_blank'><img src='https://img.icons8.com/sf-black-filled/64/null/instagram-new.png' alt='Info to Instagram'></a></li>
          <li><a href='https://www.linkedin.com/in/rizka-rosalinda-pratiwi-7716b11b7/' target='_blank'><img src='https://img.icons8.com/sf-black-filled/64/null/linkedin.png' alt='Info to LinkedIn'></a></li>
        </ul>
      </div>
        <form class='email-form' action='#' >
          <h3>Contact Us</h3>
          <input type='email' name='email' placeholder='Your email address' required>
          <textarea name='message' placeholder='Your message' required></textarea>
          <button class="tombol-sub" type='submit' alt='Send Message' disabled>Send</button>
        </form>
      </div>
      <div class="copyright">
        <p> copyright 2023, Menu Mate by <a href="#">Rizka Rosalinda</a></p>
      </div>
      </footer>
      `;
    this.shadowRoot.innerHTML = FooterContactHtml;
  }
}

customElements.define("footer-contact", FooterContact);
