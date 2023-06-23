function createFormValidator(form) {
    const usernameInput = form.querySelector(".username-input");
    const phoneInput = form.querySelector(".phone-input");
    const submitButton = form.querySelector(".submit-button");
  
    // Init intl-tel-input
    const iti = intlTelInput(phoneInput, {
      preferredCountries: [
        "sa",
        "ae",
        "kw",
        "bh",
        "om",
        "qa",
        "eg",
        "jo",
        "lb",
        "sy",
        "iq",
        "ye",
        "ps",
        "ma",
        "dz",
        "tn",
        "ly",
        "mr",
        "so",
        "sd",
        "er",
        "dj",
        "et",
      ],
      separateDialCode: true,
      utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.15/js/utils.js",
    });
    setDefaultCountryCode(iti);
  
    function validateForm() {
      const countryCode = iti.getSelectedCountryData().dialCode;
      if (usernameInput.value && phoneInput.value && countryCode) {
        submitButton.disabled = false;
      } else {
        submitButton.disabled = true;
      }
    }
  
    function handlePhoneKeypress(event) {
      // Allow only numbers (0-9)
      const keyCode = event.which || event.keyCode;
      if (keyCode < 48 || keyCode > 57) {
        event.preventDefault();
      }
    }
  
    usernameInput.addEventListener("input", validateForm);
    phoneInput.addEventListener("input", validateForm);
    phoneInput.addEventListener("keypress", handlePhoneKeypress);
    phoneInput.addEventListener("countrychange", validateForm);
  }
  
  // Get the form ID
  const form = document.querySelector("#new-receiver-form");
  createFormValidator(form);
  
  async function setDefaultCountryCode(itiInstance) {
    try {
      const response = await fetch("https://ipwhois.app/json/");
      const data = await response.json();
  
      if (data && data.country_code) {
        itiInstance.setCountry(data.country_code.toLowerCase());
      }
    } catch (error) {
      console.error("Error setting default country code:", error);
    }
  }
  