export const fullNameRegex = /^[\p{L}\p{M}\p{Zs}'-]+([\p{Zs}'-][\p{L}\p{M}\p{Zs}'-]+)*$/u;
export const valMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
export const objectid = /^[0-9a-fA-F]{24}$/
export const addressRegex = /^[\p{L}\p{M}\p{Zs}0-9]+$/u;
export const cityRegex = /^[\p{L}\p{M}\p{Zs}]+$/u;
export const isZipRegex = /^\d{7}(?:[-\s]\d{4})?$/;
export const valpassword = /^[a-zA-Z]\w{7,14}$/
export const valusername = /^[א-ת][א-תא-ת]{2,10}(?: [א-ת][א-תא-ת]*){0,10}$/
export const productname = /^[A-Z][a-zA-Z0-9 \-]*$/;
export const imgfile: any = /^image\/(jpe?g|png|gif)$/;

