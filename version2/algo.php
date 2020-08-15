<?php
//daily working hours is in.... hour
//teachers list is in ...teacher
//class room names are in ...rooms
// course names are in coursesNames
//break period is in breakk
//import { exit } from "process";

//lectures with weekly ch like 1+1+1,2+2z
// let break_period = -1;
    




$w_hours=intval($_POST['w_hour']);
$break_period=intval($_POST['break'])-1;
$rooms=array();
$coursesNames = array();
$teacher = array();
$lectures = array();
$room=explode("\n", str_replace("\r", "",  $_POST["rooms"]));
foreach ($room as &$ids) {
  array_push($rooms,$ids);
}
$crsName=explode("\n", str_replace("\r", "",  $_POST["crsName"]));
//echo ("<p>your class info $crsName[1] </p>");
//$coursesNames = array("os", "taf", "aoa", "mc", "db", "dbase");

foreach ($crsName as &$ids) {
  array_push($coursesNames,$ids);
}

$tchr=explode("\n", str_replace("\r", "",  $_POST["tchr"]));
foreach ($tchr as &$ids) {
  array_push($teacher,$tchr);
}
$lec=explode("\n", str_replace("\r", "",  $_POST["lec"]));
$tchr=explode("\n", str_replace("\r", "",  $_POST["tchr"]));
foreach ($lec as &$ids) {
  array_push($lectures,$ids);
}

// w_hours = parseInt(localStorage.getItem("w_hour"));
// let break_period = parseInt(localStorage.getItem("breakk")) - 1;
$total_classes = 0;
$w_days = 5;
//   $teacher = array("talia", "tauqeer", "samyan", "rubina", "atif", "awais");
// teacher = localStorage.getItem("teacher").split(",");
        // rooms = localStorage.getItem("roomNames").split(",");
          // courses = localStorage.getItem("course");
        // coursesNames = courses.split(",");
        $m = count($teacher);
        $n = count($rooms);
        $k = count($coursesNames);
        
        // echo $w_hours;
        // echo '</br>';
// echo $teacher[0];
// echo '</br>';
// echo $teacher[1];
// echo '</br>';
// echo $rooms[0];
// echo '</br>';
// echo $coursesNames[0];


//set maxed from left
// echo $break_period;
$maxPeriod = $break_period;
// echo $maxPeriod;
// //set maxed from right
$maxed = $w_hours - $break_period - 1;
 if ($maxed > $maxPeriod) $maxPeriod = $maxed;



// $lectures = array('2','2','1','1','1','2');
// echo $lectures[0];
// lectures = localStorage.getItem("lectures").split(",");
class teachers{
  public $name;
function teachers($name) {
  $this->name = $name;
  $this->avail = [
    [true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true],
  ];
}
}

//setting tables
class Table{
function Table() {
  global $w_hours;
  global $w_days;
  global $break_period;
  $this->sch = Array();
  for ($index = 0; $index < $w_days; $index++) {
    $this->sch[$index] = Array();
  }
  for ($i = 0; $i < $w_days; $i++)
    for ($j = 0; $j < $w_hours; $j++) {
      if ($j != $break_period) {
        $this->sch[$i][$j] = "none";
      } else $this->sch[$i][$j] = "break";
    }

  $this->availSingleSlot = false;
  $this->availMultipleSlots = false;
  $this->availSingleDay = 0;
  $this->availSingleHour = 0;
}
}
$tab = Array();
for ($index = 0; $index < $n; $index++) {
  $a = new Table();
  $tab[$index] = $a;
}
// echo $tab[0]->sch[0][3];
function set($tabNo, $day, $hour, $c_name) {
  global $tab;
  $tab[$tabNo]->sch[$day][$hour] = $c_name;
}
// set(0,0,0,'aoa');
// echo $tab[0]->sch[0][0];

function availSingle($tabNo, $day, $hour) {
  global $tab;
  $tab[$tabNo]->availSingleDay = $day;
  $tab[$tabNo]->availSingleHour = $hour;
}

function ifAvailSingle($tabNo) {
  global $tab;
  return $tab[$tabNo]->availSingleSlot;
}

function setSingle($tabNo) {
  global $tab;
  $tab[$tabNo]->availSingleSlot = true;
}

function desetSingle($tabNo) {
  global $tab;
  $tab[$tabNo]->availSingleSlot = false;
}

function getSingleDay($tabNo) {
  global $tab;
  return $tab[$tabNo]->availSingleDay;
}

function getSingleHour($tabNo) {
  global $tab;
  return $tab[$tabNo]->availSingleHour;
}

$t = array();
$c = 0;
while ($c < $m) {
  $a = new teachers($teacher[$c]);
  // t.push(a);
   array_push($t, $a);
  $c++;
}

// echo $t[0]->name;

function getTeacherInd($name) {
  global $t;
  $tr = 0;
  while ($name != $t[$tr]->name) $tr++;
  return $tr;
}

// echo getTeacherInd('atif');

// function getCreditHour($ml) {
//   $courses[$ml]->lectures--;
// }



class course{
  public $name;
  public $teach;
  public $classes;
  public $meetTimes;
  public $pointer;
  public $lectures;
  public $classess;
function course($name, $teach, $classes) {
  $this->name = $name;
  $this->teach = $teach;
  $this->classes = $classes;
  $this->meetTimes = 0;
  $this->pointer = 0;
  $this->lectures = 0;
  $this->classess = array();
}
}
$c = 0;
$lecNo = 0;
$courses = array();
while ($c < $k) {
  $lecNo++;
  $a = new course($coursesNames[$c], $teacher[$c], $lectures[$c]);
  // if (lecNo < localStorage.getItem("lectures").split(",").length + 1)
  if ($lecNo < 7)
    $aa = strlen($lectures[$c]);
  else $aa = 0;

  for ($index = 0; $index < $aa; $index += 2) {
    $a->meetTimes += intval($a->classes[$index]);
    // echo '</br>';
    // echo $a->meetTimes;
    // echo $a->classes[$index];
    // echo $a->classes[$index];
    // echo intval($a->classes[$index]);
    // echo '</br>';
    
    $lecc = intval($a->classes[$index]);
    if ($lecc <= $maxPeriod)// $a->classess.push($lecc);
     array_push($a->classess, $lecc);
    else {
    }
    $a->lectures++;
  }
  // courses.push(a);
  array_push($courses,$a);
  $total_classes += $a->meetTimes;

  // echo $a->meetTimes;
  // if (a.meetTimes == 0) {
  //   total_classes++;
  // }
  $c++;
}



// echo $courses[0]->name;
$schedule = Array();
for ($index = 0; $index < $w_days; $index++) {
  $schedule[$index] = Array();
}

function validateExit() {
  global $courses;
  global $k;
  $flag = true;
  for ($i = 0; $i < $k; $i++)
    if ($courses[$i]->pointer < $courses[$i]->lectures) {
      $flag = false;
    }
  return $flag;
}

function getCreditHour($current_subj) {
  global $courses;
  if ($courses[$current_subj]->pointer < $courses[$current_subj]->lectures) {
    return $courses[$current_subj]->classess[$courses[$current_subj]->pointer++];
  } else {
    return 0;
  }
}

//for teacher
function ifAvail($current_teach, $i, $j, $h) {
  global $t;
  for ($k = 0; $k < $h; $k++) {
    if ($t[$current_teach]->avail[$i][$j + $k] == false) {
      return false;
    }
  }
  return true;
}
$allocated = 0;

function init() {
  global $w_days;
  global $w_hours;
  global $schedule;
  global $break_period;
  for ($i = 0; $i < $w_days; $i++)
    for ($j = 0; $j < $w_hours; $j++) {
      if ($j != $break_period) {
        $schedule[$i][$j] = "none";
      } else $schedule[$i][$j] = "break";
    }
}


function show($tableNo, $roomNo){
  // echo $tableNo;
  // echo ' and ';
  // echo $roomNo;
  global $tab;
  global $w_hours;
  global $w_days;
  global $rooms;
  $showHour =intval($_POST['startHour']);


  echo '<table>';
  echo '<tr>';
  for ($index = 0; $index < $w_hours; $index++) {
    if ($showHour == 13) {
      $showHour=1;
    }
    if ($showHour + 1 == 13) {
      echo '<th>';
      echo $showHour++;
      echo '-';
      echo '1';
      echo '</th>';
    } else echo "<th>".$showHour++."-".$showHour."</th>";
  }
  echo "</tr >";
  for ($r = 0; $r <$w_days; $r++) {
    echo "<tr>";
    for ($index = 0; $index < $w_hours; $index++) {
      echo "<td>".$tab[0]->sch[$r][$index]."</td>";
    }
    echo "</tr>";
  }

  echo "</br>";
  echo '<center> <h3>ROOM--'.$rooms[$roomNo].'</h3></center>';
  echo '</br>';
  echo '</table>';
  echo '</br>';
  echo '</br>';
  echo '</br>';

}

function generate() {
  global $total_classes;
  $t_name = "";
  $c_name = "";
  $current_subj = 0; //to loop through all subjects
  $current_teach = 0;
  $day = 0;
  $ch = 0;
  $credit_h = true;
  $classes = $total_classes;
  $hour = 0;
  $room = 0;
  $availTrack = true;
  $track = [0, 0, 0];
  $trackIndex = 0;
  $roomNo = 0;
  $fill = false;
  $singles = [0, 0];
  $current = false;
  $tableNo = 0;
  $tracked = true;
  $loopHour = -1;
  $loopDay = -1;
  $allocated=0;
global $w_hours;
global $w_days;
global $courses;
global $break_period;
global $tab;
global $schedule;
global $t;
global $k;
global $n;

// echo $total_classes;
  if ($total_classes == 0) {
    return;
  }
  // echo $total_classes;
  init();
  while (true) {
    for ($hour = 0; $hour < $w_hours; $hour++) {
      
      //validate break
      if ($hour == $break_period) {
        continue;
      }
      $tracked = true;
      if ($credit_h == true) {
        $current = true;
        $ch = getCreditHour($current_subj); //change
        if ($ch == 0) {
          $classes--;
        }
        if (
          $ch > 0 &&
          $track[0] == $ch &&
          ifAvail($current_teach, $track[1], $track[2], $ch) == true &&
          $schedule[$track[1]][$track[2]] == "none"
        ) {
          $c_name = $courses[$current_subj]->name;
          $t_name = $courses[$current_subj]->teach;
          $current_teach = getTeacherInd($t_name);
          $t_name = $t[$current_teach]->name;
          $tempHour = $track[2];
          while ($ch > 0) {
            $schedule[$track[1]][$tempHour] = $courses[$current_subj]->name;

            set($tableNo, $track[1], $tempHour, $c_name);
            $t[$current_teach]->avail[$track[1]][$tempHour] = false;
            $allocated++;
            $tempHour++;
            $classes--;
            $ch--;
          }
          $track[0] = 0;
          $track[1] = 0;
          $track[2] = 0;
          $vavailTrack = true;
          $trackIndex = 0;
          $tracked = false;
        }

        if ($tracked == true) {
          $credit_h = false;

          if ($ch == 1 && $tableNo > 0 && ifAvailSingle($tableNo - 1)) {
            $c_name = $courses[$current_subj]->name;
            $t_name = $courses[$current_subj]->teach;
            $current_teach = getTeacherInd($t_name);
            $t_name = $t[$current_teach]->name;
            $tempDay = getSingleDay($tableNo - 1);
            $tempHour = getSingleHour($tableNo - 1);
            if (ifAvail($current_teach, $tempDay, $tempHour, $ch)) {
              $set($tableNo - 1, $tempDay, $tempHour, $c_name);
              desetSingle($tableNo - 1);
              $t[current_teach]->avail[$tempDay][$tempHour] = false;
              $classes--;
              $allocated++;
              $ch--;
            } else $fill = true;
          }
          if ($ch == 1) {
            $fill = true;
          }
        }
      }
      if ($tracked == true) {
        $tracked = false;
        if ($hour < $break_period && $ch + $hour > $break_period) {
          if (4 - $hour == 1) {
            $singles[0] = $day;
            $singles[1] = $hour;
          }
          if ($availTrack || $schedule[$track[1]][$track[2]] != "none") {
            $track[0] = $break_period - $hour;
            $track[1] = $day;
            $track[2] = $hour;
            $availTrack = false;
          }
          $current = true;
          continue;
        }

        if ($hour + $ch > $w_hours && $day == $w_days - 1) {
          $courses[$current_subj]->pointer--;
          if ($current_subj < $k - 1) {
            $current_subj++;
          } else if ($current_subj == $k - 1) {
            $current_subj = 0;
          }
          $credit_h = true;
          $hour--;
          continue;
        }
        //credit hour should not cross working hours
        if ($hour + $ch > $w_hours) {
          if ($availTrack == true || $schedule[$track[1]][$track[2]] != "none") {
            $track[0] = $w_hours - $hour;
            $track[1] = $day;
            $track[2] = $hour;
          }
          $availTrack = false;
          $current = true;
          continue;
        }

        $c_name = $courses[$current_subj]->name;
        $t_name = $courses[$current_subj]->teach;
        $current_teach = getTeacherInd($t_name);
        $t_name = $t[$current_teach]->name;

        if ($fill == true && $ch == 1) {
          for ($i = 0; $i <= $day; $i++)
            for ($j = 0; $j < $w_hours; $j++) {
              if ($i == $day && $j == $hour) {
                $j = 20;
                $i = 20;
                continue;
              }
              if (
                $schedule[$i][$j] == "none" &&
                ($schedule[$i][$j - 1] != "none" ||
                  $schedule[$i][$j + 1] != "none" ||
                  $schedule[$singles[0]][$singles[1]] != "none")
              ) {
                $singles[0] = $i;
                $singles[1] = $j;
              }
            }
        }

        if (
          $current == true &&
          $fill == true &&
          $singles[1] > 0 &&
          $c_name != $schedule[$singles[0]][$singles[1] - 1] &&
          $ch == 1 &&
          $schedule[$singles[0]][$singles[1]] == "none"
        ) {
          $schedule[$singles[0]][$singles[1]] = $courses[$current_subj]->name;
          set($tableNo, $singles[0], $singles[1], $c_name);
          $allocated++;
          $t[$current_teach]->avail[$singles[0]][$singles[1]] = false;
          $classes--;
          $ch--;
          $fill = false;
          $singles[0] = 0;
          $singles[1] = 0;
        }
      }
      $tracked = true;

      //default
      if ($ch > 0 && ifAvail($current_teach, $day, $hour, $ch) == true) {
        $current = false;
        $schedule[$day][$hour] = $courses[$current_subj]->name;
        set($tableNo, $day, $hour, $c_name);
     //   echo $schedule[$day][$hour];
        $t[$current_teach]->avail[$day][$hour] = false;
        $ch--;
        $classes--;
        $allocated++;
        continue;
      } else if ($ch > 0 && !ifAvail($current_teach, $day, $hour, $ch)) {
        $courses[$current_subj]->pointer--;
        if ($current_subj < $k - 1) {
          $current_subj++;
        } else if ($current_subj == $k - 1) {
          $current_subj = 0;
        }
        $credit_h = true;
        $hour--;
        continue;
      } else if ($classes <= 0) {
        
        if ($roomNo >= $n) {
   //         echo $tableNo;
 //     echo $roomNo;
          show($tableNo, $roomNo);
          $roomNo++;
          $tableNo++;
          return;
        }
        if (validateExit()) {
         show($tableNo, $roomNo);
          $roomNo++;
          $tableNo++;
          return;
        } else {
          $classes = $classes + $k;
          // current_subj = 0;
          if ($loopHour == $hour && $loopDay == 2 * $day) {
            $hour++;
          }
          $loopHour = $hour;
          $loopDay = $day;
          $hour--;
          continue;
        }
      }
      else {
        if (
          $ch > 0 &&
          $courses[$current_subj]->pointer == $courses[$current_subj]->lectures
        ) {
          $classes = $classes + $k;
        } else if ($current_subj < $k - 1) {
          $current_subj++;
        } else if ($current_subj == $k - 1) {
         $current_subj = 0;
        }
        $credit_h = true;
        $hour--;
      }

      //handle diff classes of same subject
    }

    if ($day == $w_days - 1) {
      if ($roomNo == $n) {
    //    console.table(schedule);
  // echo $tableNo;
  //     echo $roomNo;
        show($tableNo, $roomNo);
          $roomNo++;
          $tableNo++;
          return;
      }

//      console.table(schedule);

      // echo $tableNo;
      // echo $roomNo;
     show($tableNo, $roomNo);
          $roomNo++;
          $tableNo++; $day = 0;
      $hour = 0;
      if ($schedule[$singles[0]][$singles[1]] == "none") {
        availSingle($tableNo, $singles[0], $singles[1]);
        setSingle($tableNo);
      }
      $singles[0] = 0;
      $singles[1] = 0;
      $track[0] = 0;
      $track[1] = 0;
      $track[2] = 0;
   
      init();
    } else $day++;
  }
}

generate();

//have to make teacher avail dynamic

?>