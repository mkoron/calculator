$expression = "";
$calculate = false;
$displayChars = 10;

/*Functions*/
function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

function resetAll() {
  $expression = "";
  $calculate = false;
}

function calculate() {
  if ($calculate) {
    $("#display").text(round(eval($expression), 6));
  }
}

/*Buttons*/
$("#AC").click(function() {
  resetAll();
  $("#display").text("0");
});

$("#CE").click(function() {
  $current = $("#display")
    .text()
    .slice(0, -1);
  $current.length ? $("#display").text($current) : $("#display").text("0");
});

$(".number").click(function() {
  if ($("#display").text() == "0" || !$calculate) {
    $("#display").text($(this).text());
  } else {
    $("#display").text($("#display").text() + $(this).text());
  }

  $calculate = true;
});

$(".operand").click(function() {
  if ($("#display").text() == "0" && $(this).text() == "-") {
    $("#display").text("-");
    return;
  }

  if ($calculate) {
    $expression += $("#display").text();
    calculate();
    $expression += $(this).text();
    $calculate = false;
  }
});

$("#percentage").click(function() {
  if ($calculate) {
    $expression = round(eval($("#display").text()) / 100, 6) + "*";
    $("#display").text("0");
    $calculate = false;
  }
});

$("#dot").click(function() {
  if ($("#display").text() === "0") {
    $("#display").text("0.");
  } else if (
    !$("#display")
      .text()
      .match(/\./)
  ) {
    $("#display").text($("#display").text() + ".");
  }
});

$("#equal").click(function() {
  $expression += $("#display").text();
  calculate();
  resetAll();
});
