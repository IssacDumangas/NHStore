$(document).ready(function () {
  $("#navbar").load("Navbar.html", function () {
    $("#Delivery").addClass("active");
  });

  function initializeSelect2(element) {
    element.select2({
      tags: true,
      placeholder: "Type or select",
      width: "280px",
    });
  }

  // Initialize existing selects
  initializeSelect2($(".multiSelect"));

  $("#addRow").click(function () {
    // Get raw HTML instead of cloning active select2
    var newRow = `
      <tr>
                  <td><input type="date" class="date form-control" required></td>
                  <td><select class="name form-select" required>
                    <option selected>Select a Name</option>
                    <option value="Benten">Benten</option>
                    <option value="Inggo">Inggo</option>
                    <option value="Joey">Joey</option>
                    <option value="Joshua">Joshua</option>
                    <option value="Larry">Larry</option>
                    <option value="Marlon">Marlon</option>
                    <option value="Meme">Meme</option>
                    <option value="Ompong">Ompong</option>
                    <option value="Ramil">Ramil</option>
                    <option value="Reymark">Reymark</option>
                  </select></td>
                  <td><input type="number" class="helper form-control"></td>
                  <td>
                    <select class="trip form-select multiSelect" multiple>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="PickUp KB">PickUp KB</option>
                      <option value="PickUp Suning">PickUp Suning</option>
                      <option value="PickUp Marc">PickUp Marc</option>
                    </select>
                  </td>
                  <td><select class="color form-select" required>
                        <option selected>Select Color</option>
                         <option value="Green">Green</option>
                         <option value="Red">Red</option>
                      </select>
                      </td>
                  <td>
                    <button type="button" class="removeRow form-control">
                      <i class="bi bi-trash-fill text-danger"></i>
                    </button>
                  </td>
                </tr>
    `;

    $("#tripsTable tbody").append(newRow);

    // Initialize Select2 only on the new row
    initializeSelect2($("#tripsTable tbody tr:last .multiSelect"));
  });

  $(document).on("click", ".removeRow", function () {
    if ($("#tripsTable tbody tr").length > 1) {
      $(this).closest("tr").remove();
    }
  });

  // Submit form
  $("#deliveryform").submit(function (e) {
    e.preventDefault();

    var trips = [];

    $("#tripsTable tbody tr").each(function () {
      trips.push({
        date: $(this).find(".date").val(),
        name: $(this).find(".name").val(),
        helper: $(this).find(".helper").val(),
        trips: $(this).find(".trip").val(),
        color: $(this).find(".color").val(),
      });
    });

    fetch(
      "https://script.google.com/macros/s/AKfycbycLn9yGn4u4SFK0LZAggmi5mVPFdyakGQuaDWQfDoXHJ4NfsmGv8LD7crdJvjjLW1p/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          trips: JSON.stringify(trips),
        }),
      },
    );

    // Show alert
    $("#alertContainer").html(`
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        Trips saved successfully!
      </div>
    `);

    // Auto close after 3 seconds
    setTimeout(function () {
      var alertEl = document.querySelector(".alert");
      if (alertEl) {
        var bsAlert = new bootstrap.Alert(alertEl);
        bsAlert.close();
      }
    }, 1500);

    $("#tripsTable tbody").html(`
      <tr>
                  <td><input type="date" class="date form-control" required></td>
                  <td><select class="name form-select" required>
                    <option selected>Select a Name</option>
                    <option value="Benten">Benten</option>
                    <option value="Inggo">Inggo</option>
                    <option value="Joey">Joey</option>
                    <option value="Joshua">Joshua</option>
                    <option value="Larry">Larry</option>
                    <option value="Marlon">Marlon</option>
                    <option value="Meme">Meme</option>
                    <option value="Ompong">Ompong</option>
                    <option value="Ramil">Ramil</option>
                    <option value="Reymark">Reymark</option>
                  </select></td>
                  <td><input type="number" class="helper form-control"></td>
                  <td>
                    <select class="trip form-select multiSelect" multiple>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="PickUp KB">PickUp KB</option>
                      <option value="PickUp Suning">PickUp Suning</option>
                      <option value="PickUp Marc">PickUp Marc</option>
                    </select>
                  </td>
                  <td><select class="color form-select" required>
                        <option selected>Select Color</option>
                         <option value="Green">Green</option>
                         <option value="Red">Red</option>
                      </select></td>
                  <td>
                    <button type="button" class="removeRow form-control">
                      <i class="bi bi-trash-fill text-danger"></i>
                    </button>
                  </td>
                </tr>
    `);
    initializeSelect2($(".multiSelect"));
  });
});
