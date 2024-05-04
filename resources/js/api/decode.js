/** декодирует символы URL в читабельную строку */
export const decodeCommaUrl = (urlStr) => {
  let decodeUrlStr = urlStr;
  while (decodeUrlStr.includes("%25")) {
    decodeUrlStr = decodeUrlStr.replace("%25", "%");
  }
  while (decodeUrlStr.includes("%2C")) {
    decodeUrlStr = decodeUrlStr.replace("%2C", ",");
  }
  return decodeUrlStr;
};
