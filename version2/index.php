<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="form-style-5">
      <form action="table.php" method="post">
        <div class="con">
          <button id="reset" type="reset" onclick="localStorage.clear()">
            reset
          </button>
        </div>

        <fieldset>
          <legend><span class="number">1</span>Hour Info</legend>
          <input type="number" name="w_hour" id="wh" placeholder="Working Hours">
          <input type="number" name="break" id="br" placeholder="Break Period" />
          <input type="number" name="startHour" id="strt" placeholder="Day Starts At" />

        </fieldset>
        <!-- rooms -->
        <fieldset >
          <legend><span class="number">2</span>Rooms Info</legend>
          <textarea style="width:fit-content" name="rooms" rows = "3" cols = "40"></textarea>
        </fieldset>
        <!-- COURSE INFO -->
        <fieldset>
          <legend><span class="number">3</span>Courses Info</legend>
          <textarea type="text" id="crsName" name="crsName" style="text-align:center" name="crsName" rows = "3" cols = "20" placeholder="Course Name"></textarea>
          <textarea type="text" name="tchr" id="tchr" rows = "3" cols = "20" placeholder="Teacher Name"></textarea>
          <textarea type="text" id="lec" name="lec" rows = "3" cols = "20" placeholder="Lectures"></textarea>
        </fieldset>
      
        <center>
          <!-- <a
            href="table.php"
            target="_blank"
            style="padding: 15px; background-color: rgb(56, 116, 71);"
          >
            Generate
          </a> -->
          <input type="submit" name="submit" value="Submit">  
        </center>
      </form>
    </div>
  
  </body>
</html>
