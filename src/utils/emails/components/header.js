function getHeaderTemplate({ data = { btnLink: '', btnContent: '' } }) {
  const headerContent = `
<header class="email-header">
  <div class="header_item">
    <a
      href="${process.env.BASE_URL}"
      class="header__logo header__link"    >
      <img
        src="${process.env.BASE_URL}/images/e-vote-ws.svg"
        alt="Evote App Logo"
        class="header__img"
      />
    </a>
  </div>

  <div class="header_item">
    <a href="${data.btnLink}" class="header__link btn btn-secondary">
      <i class="fas fa-user-check"></i>
      <span class="header-text">${data.btnContent}</span>
    </a>
  </div>
</header>
`;

  return headerContent;
}

export default getHeaderTemplate;
