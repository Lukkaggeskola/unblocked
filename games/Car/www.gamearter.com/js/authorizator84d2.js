function connector(){};
var Auth = new connector();


connector.prototype.init = function()
{
    Auth.addLogoutListener();
};


/**
 * Autorizace nad vlastnim webem
 * @param object response
 */
connector.prototype.logged = function(response)
{
    Auth.destroyDialog();
    try {
        Garter.loginCallback(response);
    } catch(e) {
        console.info(e);
    }
    
    parent.postMessage({status: 'logged', response: response}, 'https://www.gamearter.com');    
};


connector.prototype.messageReciever = function(MessageEvent)
{
    if (MessageEvent.origin !== 'https://auth.gamearter.com') { return; }
        
    try {
        data = JSON.parse(MessageEvent.data);
    } catch(e) {
        data = MessageEvent.data;
    }
    
    console.warn('[authorizator] message from ' + MessageEvent.origin, data);   
    
    if ('status' in data && data.status === 'logout')
    {
        Auth.destroyIframe();
        
        try {
            Garter.loginCallback({action: 'log-out', data:{}});
        } catch (e) {
            console.info(e);
        }
    
        parent.postMessage({status: 'logout'}, 'https://www.gamearter.com');

        Auth.addLogoutListener();
    }
};


connector.prototype.logout = function()
{
    Auth.destroyIframe();
    
    // vtvoreni iframe, ktery vyvola proces odhlaseni na GA
    var ifrm = document.createElement('iframe'); 
        ifrm.setAttribute('src', 'https://auth.gamearter.com/logout');
        ifrm.setAttribute('id', 'ga-logoutiframe-1');
        ifrm.style.width  = 0;
        ifrm.style.height = 0;
        ifrm.style.border = 'none';    
    document.body.appendChild(ifrm);

    window.addEventListener('message', Auth.messageReciever);
};


connector.prototype.destroyIframe = function()
{
    var element = document.getElementById('ga-logoutiframe-1');
    if (element !== null)
    {
        element.parentNode.removeChild(element);
        window.removeEventListener('message', Auth.messageReciever);
    }
};

connector.prototype.destroyDialog = function()
{
    var element = document.getElementById('gasso');
    if (element !== null)
    {
        element.parentNode.removeChild(element);
    }
};


connector.prototype.addLogoutListener = function()
{
    // toto se pouziva na hlavnim webu. Druhy (stejny) listener je v Gameplayeru
    if (document.getElementById('ga-logoutbutton-1') !== null)
    {
        document.getElementById('ga-logoutbutton-1').addEventListener('click', Auth.logout);
    }
};


document.addEventListener('DOMContentLoaded', Auth.init);
