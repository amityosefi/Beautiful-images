<template>
  <div>
    <br>
    <div class="par">
      <div class="right-to-left">
      שלום רב,
      <br>
      ברוכים הבאים למשחק העדפת תמונות.
    <br>
    המשחק נערך במסגרת פרויקט גמר שמתבצע במחלקה להנדסת תכנה ומערכות מידע.
    <br><br>
    המשחק מחולק לשני שלבים:
    <br>
    בשלב הראשון, עליכם לצפות ב-27 תמונות לפחות ולתת להן ציון שמבטא עד כמה אתם אוהבים את התמונה. שלב זה נמשך כ- 01 דקות. חשוב שתתנו ציונים 
    המשקפים את העדפותיכם כי הצלחתכם במשחק תלויה בכך שבהמשך תצליחו לזהות אילו תמונות אהבתם יותר ואילו תמונות אהבתם פחות.
    <br>
    בשלב השני, אתם מוזמנים לשחק במשחק:  בפניכם יוצג מסך שבו 8 תמונות מתוך התמונות שראיתם בשלב הראשון. האתגר הוא לבחור מבין התמונות האלו
    את שתי התמונות להן נתתם את הציונים הגבוהים ביותר בשלב הראשון. על כל בחירה נכונה תזכו בנקודה. כל משחק כולל ארבעה מסכים כאלו. 
    <br><br>
    מטרת המשחק היא לצבור כמה שיותר נקודות. אנא התאמצו ככל האפשר כדי שתהיה לנו תחרות מעניינת!
    <br>
    אתם מוזמנים לשחק במשחק פעם אחת בכל יום, במהלך כל התקופה בה יהיה המשחק זמין. לא ניתן לשחק במשחק יותר מפעם ביום.
    <br>
    כדי לאפשר משחק בהתאם לכללים, וכדי לאפשר קשר אתכם במהלך תקופת המשחק, נבקשכם לציין כתובת של דואר אלקטרוני באמצעותה נוכל לשלוח לכם 
    הודעות (למשל, תזכורת במידה ועברו כמה ימים מאז שיחקתם לאחרונה). מעבר לכך, אין צורך באמצעי הזדהות כלשהו. אם תרצו, אתם יכולים לבחור לעצמכם 
    כינוי שיאפשר לכם לזהות את עצמכם בטבלת השחקנים המצטיינים.
    <br><br>
    אנו מתחייבים:
    <br>
    - לעדכן אתכם לגבי ההישגים שלכם באמצעות טבלת ההישגים draobredaeL.
    <br>
    - שכל הנתונים על המשחק ישמרו על מחשב מאובטח וישמשו אך ורק לניתוחים סטטיסטיים. בשום אופן לא יפורסמו נתונים אישיים לגביכם.
    <br><br>
    </div>
    <label for="checkboxG1" class="select-label" style="margin-right: 4px">אני מסכימ/ה לתנאים לעיל</label>
    <input type="checkbox" id="checkboxG1" value="Mike" class="css-checkbox" v-model="checkSelect" />
    <br>
    <div v-if="this.feedback" style="color: red;" > יש להסכים לתנאים כדי להמשיך בהרשמה</div>
    <br>
    <div class="d-flex justify-content-center">
      <br>
      <button type="button" class="btn btn-outline-secondary" v-on:click="submit">
       המשך      </button>
    </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "InstructionsPage",
  date() {
    return {
      checkSelect: [],
      feedback: true
    }
  },
  components: {
  },
  methods: {
      submit(){
        console.log(this.checkSelect.length);
        if (this.checkSelect.length != 0)
        {
          this.feedback = false;
          this.$router.push("Register").catch(failure =>
            {
              console.log(failure);
              this.$router.push("Register");
            });

        }
        else
        {
          this.feedback = true;
        }

        console.log(this.feedback);
        // if (this.checkSelect == true)
        // {
          
        // }
        // else
        // {
        //   this.$root.toast("Warning", "You must confirm the terms and conditions", "warning");
        // }
      }
  },
  created() {
    this.checkSelect = [];
    this.feedback = true;
  },
};
</script>
<style scoped>
.par{
 text-align: right;
 font-family: Calibri;
 margin: 0 auto;
 margin-bottom: 10px;
 width: 60%;
 border: 5xp;
 border-style: groove;
padding: 10px;
 
}

.right-to-left {
display:block;
direction:rtl;
unicode-bidi:bidi-override
/* margin-top: 10px;
margin-bottom: 10px; */
}

.confirm{
  color: red;
}
</style>