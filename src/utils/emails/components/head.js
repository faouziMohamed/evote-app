import defaultStyle from './style';

const head = `<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Activate your account</title>

    <link
      rel="preload"
      href="https://pro.fontawesome.com/releases/v5.15.2/css/all.css"
      as="style"
    />

    <link
      rel="stylesheet"
      href="https://pro.fontawesome.com/releases/v5.15.2/css/all.css"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

    <link
      href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,100;0,200;0,300;0,500;0,600;0,700;1,100;1,200;1,500;1,600;1,700&family=Roboto:ital,wght@0,100;0,300;0,400;0,700;1,100;1,300;1,400;1,700&display=swap"
      rel="stylesheet"
    />

   ${defaultStyle}
  </head>`;

export default head;
