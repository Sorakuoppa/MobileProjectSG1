
export const isValidEmail = (email) => {
    // Placeholder validation for email
    return /\S+@\S+\.\S+/.test(email);
  };
  
export  const isValidPassword = (password) => {
    // Placeholder validation for password
    return password.length >= 6;
  };
  
export  const isValidUsername = (username) => {
    // Placeholder validation for username
    return username.length > 0;
  };
  
