const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <footer>
        <div class="wrapper">
          <ul>
            <li class=" level-0 ">
              <span>© Common Sensing Ltd. {year}</span>
            </li>
            <li class=" level-0 ">
              <a target="_blank" rel="noreferrer" href="/privacy-policy">Privacy Policy</a>
            </li>
            <li class=" level-0 ">
              <a target="_blank" rel="noreferrer" href="/terms-and-conditions">Terms and Conditions</a>
            </li>
            <li class=" level-0 ">
              <a target="_blank" rel="noreferrer" href="https://spatialdays.com/">
                Site by <strong>Spatial Days</strong>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
