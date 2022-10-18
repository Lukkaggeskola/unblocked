fetch('https://notkeggesite.gq/thekaggespasssecret.txt').then(response => response.text()).then((data) => {alert(data)})
var user = prompt("Enter access code");
if(data==user)
{
} else
{
  alert("wrong access code")
  window.location = "https://www.notkeggesite.gq/"
}
