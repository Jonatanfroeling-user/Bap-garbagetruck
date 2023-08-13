/** cerated and handles html popup forms and such */
// note: currently also handles requests
class HtmlOutClass {
  constructor() {
    const container = document.getElementById("prompt_form_transfer_send");
    this.formSend = {
      parent: container.parentElement,
      container: container,

      userFrom: container.querySelector("input[name='user-from']"),
      userTo: container.querySelector("select[name='user-to']"),
      wayStreet: container.querySelector("input[name='way-street']"),
      wayId: container.querySelector("input[name='way-id']"),
      waySelectAll: container.querySelector("input[name='way-select-all']"),

      error: container.querySelector(".alert.alert-danger"),
      btnCancel: container.querySelector("button#transfer_close"),
    };

    const containerRecieve = document.getElementById(
      "prompt_form_transfer_recieve"
    );
    this.formRecieve = {
      parent: containerRecieve.parentElement,
      container: containerRecieve,

      content: containerRecieve.querySelector("#content"),
      wayId: containerRecieve.querySelector("input[name='way-id']"),

      error: containerRecieve.querySelector(".alert.alert-danger"),
      btnCancel: containerRecieve.querySelector("button#transfer_decline"),
      btnAccept: containerRecieve.querySelector("button#transfer_accept"),
    };

    // Events
    // send form submit
    this.formSend.container.addEventListener("submit", (e) => {
      e.preventDefault();
      currentUser.sendTransferRequest(e);
      this.formSend.parent.classList.add("hide");
    });
    // send cancel click
    this.formSend.btnCancel.addEventListener("click", () => {
      this.formSend.parent.classList.add("hide");
    });

    // recieve: cancel click
    this.formRecieve.btnCancel.addEventListener("click", (event) => {
      event.preventDefault();
      otherUser.sendTransferResponse(false, this.formSend.wayId.value);
      this.formRecieve.parent.classList.add("hide");
    });
    // recieve: accept click
    this.formRecieve.btnAccept.addEventListener("click", (event) => {
      event.preventDefault();
      otherUser.sendTransferResponse(true, this.formSend.wayId.value);
      this.formRecieve.parent.classList.add("hide");
    });
  }

  // open user select form
  promptSendRequest(id) {
    const data = currentUser.route.lookupPart.get(id);
    if (!data)
      return warn("448: Current user does not contain street part: " + id);

    for (let [name, info] of Object.entries(offlineServer.users).filter(
      (i) => i[1].activeRoute
    )) {
      if (name === currentUser.user.name) continue;
      this.formSend.userTo.innerHTML += `<option>${name}</option>`;
    }
    this.formSend.userFrom.value = currentUser.user.name;

    this.formSend.wayId.value = id;
    this.formSend.wayStreet.value = data.street.name;

    this.formSend.parent.classList.remove("hide");
    // info('2 - dom - send req', id)
  }

  promptRecieveRequest(request) {
    //const {id, from, to, name, street} = request
    // info('6 - dom - recieve req', request)

    this.formRecieve.wayId.value = request.id;
    this.formRecieve.content.innerHTML = String(JSON.stringify(request.name));

    this.formRecieve.parent.classList.remove("hide");
  }
}

// statistics, html preview
class StatisticsClass {
  constructor() {
    this.parentElement = document.createElement("div");
    this.statTotalElm = document.getElementById("stat_total");
    this.parentElement.id = "stats";
    document.body.appendChild(this.parentElement);
  }
  create() {
    const statsElm = document.createElement("p");
    statsElm.id = "stat-elm-" + this.parentElement.childNodes.length;
    this.parentElement.appendChild(statsElm);
    return statsElm;
  }
  setGlobalStats() {
    this.statTotalElm.innerText = currentUser.route.done;
  }
}
