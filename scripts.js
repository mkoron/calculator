$expression = "";
$current = "";
$calculate = false;
$displayChars = 10;

function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function resetAll() {
  $current = "";
  $expression = "";
  $calculate = false;
}
 
/*Buttons*/
$('#AC').click(function() {
  resetAll();
  $('#display').text("0");
});

$('#CE').click(function() {
  $current = $current.slice(0, -1)
  $expression = $expression.slice(0, -1)
  $current.length ? $('#display').text($current) : $('#display').text('0');
});

$('.number').click(function() {
  var number = $(this).text();

  if ($current.length === $displayChars) {
    return;
  }
  
  if ($expression === "") {
    $current = number;
    $expression = number;
  } else {
    $current += number;
    $expression += number;
  }
  $('#display').text($current);
  $calculate = true;
});

$('.operand').click(function() {
  var operand = $(this).text();

  if ($expression === "" && operand === "-") {
    $expression = "-";
    $current = "-";
    $('#display').text($current);
    return;
  } else if ($calculate) {
    $expression = round(eval($expression), 6);
    console.log($expression);
    $('#display').text($expression);
    $expression += operand;
    $current = "";
    $calculate = false;
  } else if (!$calculate) {
    $expression = $expression.slice(0, -1) + operand;
  }
});

$('#percentage').click(function() {
  if ($calculate) {
    $expression = $expression = round(eval($expression) / 100, 6) + "";
    $current = $expression;
    $('#display').text($expression);
  }
});

$('#dot').click(function() {
  if ($current === "") {
    $current = "0.";
    $expression = "0.";
  } else if (!$current.match(/\./)) {
    $current += '.';
    $expression += '.';
  }
  $('#display').text($current);
});

$('#equal').click(function() {
  if ($calculate) {
    $expression = round(eval($expression), 6);
    $('#display').text($expression);
    resetAll();
  }
});