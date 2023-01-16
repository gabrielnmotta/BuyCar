export const phoneMask = (value?: string) => {
    if (!value) return '';
    let phone = value.replace(/\D/g, '');
    phone = phone.replace(/(\d{2})(\d)/, '($1) $2');
    phone = phone.replace(/(\d{4})(\d)/, '$1-$2');
    phone = phone.replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3');
    phone = phone.replace(/(-\d{4})\d+?$/, '$1');
  
    return phone;
  };
  
  export const rgMask = (value?: string) => {
    if (!value) return '';
    let rg = value.replace(/\D/g, '');
    rg = rg.replace(/(\d{2})(\d)/, '$1.$2');
    rg = rg.replace(/(\d{3})(\d)/, '$1.$2');
    rg = rg.replace(/(\d{3})(\d{1,2})/, '$1-$2');
    rg = rg.replace(/(-\d{2})\d+?$/, '$1');
    return rg;
  };
  
  export const cpfMask = (value?: string) => {
    if (!value) return '';
    let cpf = value.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})/, '$1-$2');
    cpf = cpf.replace(/(-\d{2})\d+?$/, '$1');
    return cpf;
  };
  
  export const cepMask = (value?: string) => {
    if (!value) return '';
    let cpf = value.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{5})(\d)/, '$1-$2');
    return cpf;
  };
  
  
  export const moneyMask = (value?: number | string) => {
    if (!value) return 0;
    value = Number(value);
    let number;
    if (value % 1 !== 0)
      number = parseFloat(value.toFixed(2)).toFixed(2).toString();
    else number = value + '.00';
  
    number = number.replace(/\D/g, '');
    number = number.replace(/(\d{1})(\d{23})$/, '$1.$2');
    number = number.replace(/(\d{1})(\d{18})$/, '$1.$2');
    number = number.replace(/(\d{1})(\d{13})$/, '$1.$2');
    number = number.replace(/(\d{1})(\d{10})$/, '$1.$2');
    number = number.replace(/(\d{1})(\d{8})$/, '$1.$2');
    number = number.replace(/(\d{1})(\d{5})$/, '$1.$2');
    number = number.replace(/(\d{1})(\d{1,2})$/, '$1,$2');
    number = number
      .replace(/^(0*\.)*0+,/, '0,')
      .replace(/^(0+\.?)*([1-9],)/, '$2');
  
    return number;
  };
  export const intMask = (value?: number | string) => {
    if (!value) return 0;
    value = Number(value);
    let number;
    number = value.toString();
    number = number.replace(/\D/g, '');
    number = number.replace(/(\d{1})(\d{15})$/, '$1.$2');
    number = number.replace(/(\d{1})(\d{12})$/, '$1.$2');
    number = number.replace(/(\d{1})(\d{9})$/, '$1.$2');
    number = number.replace(/(\d{1})(\d{6})$/, '$1.$2');
    number = number.replace(/(\d{1})(\d{3})$/, '$1.$2');
    return number;
  };
  
  export const removeMask = (value?: string) => {
    if (!value) return '';
  
    value = value.replace(/(\.|\/|\-)/g, '');
    value = value.replace(/[^0-9]/g, '');
    return value;
  };
  
  
  
  