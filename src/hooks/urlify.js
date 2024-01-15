export default function urlify(text) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;

  return text.replace(urlRegex, function (url) {
    var hyperlink = url;
    if (!hyperlink.match("^https?://")) {
      hyperlink = "http://" + hyperlink;
    }
    return (
      '<br/> <a className="hover:text-black" href="' +
      url +
      '" rel="noopener" noreferrer target="blank">' +
      url +
      "</a> <br/>"
    );
  });
  // or alternatively
  // return text.replace(urlRegex, '<a href="$1">$1</a>')
}
