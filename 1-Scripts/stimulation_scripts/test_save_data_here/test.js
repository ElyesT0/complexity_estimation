var data = "test";

function send_post(data) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", 'https://private.unicog.org/test_save_data_here/test2.php', true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function() {
      if (xhr.status === 200 && xhr.responseText !== "GOT IT") {
          // document.body.innerHTML += xhr.responseText;
      }
      else if (xhr.status !== 200) {
          // alert('Request failed.  Returned status of ' + xhr.status);
      }
  };

  xhr.send(encodeURI('filedata='+data));
}

send_post(data);
