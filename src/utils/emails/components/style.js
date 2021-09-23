const defaultStyle = ` <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      :root {
        --primary-color: rgb(9, 11, 119);
        --primary-color-txt: #eee;
        --primary-hover-color: rgb(1, 47, 133);
        --secondary-color: #f6fffb;
        --secondary-color-txt: rgb(79, 83, 84);
        --secondary-hover-color: #ccfce6;
        --primary-shadow-color: rgb(6, 30, 75);
        --secondary-shadow-color: rgb(224, 225, 226);
      }
      a {
        text-decoration: none;
        color: rgb(0, 21, 138);
      }

      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        padding: 0.55rem 0.85rem;
        border-radius: 0.7rem;
        gap: 0.3125rem;
      }

      .btn-primary {
        color: var(--primary-color-txt);
        background-color: var(--primary-color);
        box-shadow: 0 0 0.3rem 0.01rem var(--primary-shadow-color);
      }
      .btn-primary:hover {
        background-color: var(--primary-hover-color);
        color: #ffffff;
      }

      .btn-secondary {
        background-color: var(--secondary-color);
        color: rgb(79, 83, 84);
        color: var(--secondary-color-txt);
        box-shadow: 0 0 0.3rem 0.01rem var(--secondary-hover-color);
      }

      .btn-secondary:hover {
        background-color: #fbfffd;
        color: rgb(22, 23, 43);
        box-shadow: 0 0 0.3rem 0.01rem var(--secondary-shadow-color);
      }

      .root {
        background-color: rgb(240, 251, 255);
        color: rgb(6, 0, 34);
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        font-family: Roboto, sans-serif;
        font-weight: 400;
        font-size: 0.88rem;
      }

      .email-header,
      .email-footer {
        background-color: #c1e9e7;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .email-footer {
        justify-content: center;
        font-weight: 600;
        font-size: 0.8rem;
      }
      .header__logo,
      .email-footer {
        height: 3rem;
      }

      .header__logo {
        width: 5.5rem;
      }
      .header__img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .header__link,
      .header_item {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .header_item:last-child {
        padding-inline-end: 0.3rem;
      }

      .main-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        align-self: center;
        padding: 0.5rem;
        gap: 1rem;
        width: 100%;
        max-width: 40rem;
        font-size: 1rem;
        word-break: break-word;
      }
      .alternative {
        border: 0.5px solid rgb(186, 183, 183);
        border-left-color: transparent;
        border-right-color: transparent;
        width: 100%;
        padding-block: 0.5rem;
      }
      .content-root {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .btn-verify {
        align-self: flex-start;
        display: inline-flex;
      }

      .link-container {
        font-family: 'Noto Sans Mono', sans-serif;
        word-wrap: break-word;
        background-color: #e8ffead2;
        border: 0.5px solid #ddeee6;
        border-radius: 0.5rem;
        padding: 0.5rem;
      }
    </style>`;

export default defaultStyle;
