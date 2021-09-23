import footer from './components/footer';
import head from './components/head';
import getHeaderTemplate from './components/header';

const userData = {
  _id: 1 || '1',
  name: { first: '', last: '' },
  username: '',
  email: '',
};

function getMsgBody({
  data = { token: '', btnContent: '', btnLink: '' },
  user = userData,
}) {
  const activationLink = data.btnLink;
  const messageContent = `
<div class="content-root">
  <p class="content-text">
    Hello ${user.name.first}, Please take a minute to complete your registration by
    verifying your email address
    <strong>${user.email}</strong>. Simply click the button below!
  </p>
</div>
<a
  href="${activationLink}"
  class="btn btn-primary btn-verify">
  <i class="fas fa-user-check"></i>
  <span class="header-text">${data.btnContent}</span>
</a>
<div class="content-root alternative">
  <small class="content-text">
    If the button above does not work, please copy and paste the link
    below into your browser.
  </small>
  <small class="link-container">${activationLink}</small>
</div>
`;
  return messageContent;
}

function getActivationMsg({ data = { token: '' }, user = userData }) {
  const btnLink = `${process.env.BASE_URL}/activate/?token=${data.token}`;
  const btnContent = 'Verify account';
  const header = getHeaderTemplate({ data: { btnLink, btnContent } });
  const messageContent = getMsgBody({
    data: { btnContent, btnLink, ...data },
    user,
  });
  const html = `
  <!DOCTYPE html>
<html lang="en">
  ${head}
  <body>
    <div class="root">
      ${header}
        <main class="main-content">${messageContent}</main>
      ${footer}
    </div>
  </body>
</html>`;
  return html;
}

export default getActivationMsg;
