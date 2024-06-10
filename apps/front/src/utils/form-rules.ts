export const rules = {
  required: (value) => !!value || 'Obligatoire',
  email: (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || 'Email invalide';
  },
  phoneNumber: (value) => {
    const pattern = /^((\\+|00)33|0) *[1-9]([ .-]*[0-9]{2}){4}$/;
    return pattern.test(value) || 'Format invalide';
  },
};
