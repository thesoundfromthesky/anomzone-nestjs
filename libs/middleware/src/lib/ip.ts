import { Address6, Address4 } from 'ip-address';

export function convertToIp4(ip: string) {
  let address: string;
  try {
    address = new Address4(ip).address;
  } catch (err) {
    address = new Address6(ip).parsedAddress4 ?? '0.0.0.0';
  }

  return replaceOctetToAsterisk(address);
}

export function replaceOctetToAsterisk(ip: string) {
  return ip
    .split('.')
    .map((v, i) => {
      if (i === 2 || i === 3) {
        return Array(v.length + 1).join('*');
      }
      return v;
    })
    .join('.');
}
