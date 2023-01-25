<script>
    import ModalContaner from "../modal-contaner.svelte";
    export let CloseFather;

    // controllers
    import { UpdateBranchOffice } from "../../../../controllers/branch_office/UpdateBranchOffice.js";

    //store
    import { loginData } from "../../../../store/user/login.js";
    import {
        branch_officeAllData,
        currentDataBranchOffice,
    } from "../../../../store/branch_office/branch_office.js";

    let currentTimeZone = $currentDataBranchOffice.hours_days.time_zone;

    console.log("currentTimeZone", currentTimeZone);

    let zona_text = "";

    switch (currentTimeZone) {
        case -1:
            zona_text = " + 1  Dinamarca ";
            break;
        case -2:
            zona_text = " + 2  Finlandia ";
            break;
        case -3:
            zona_text = " + 3  Turkia ";
            break;
        case -4:
            zona_text = " + 4  Iran ";
            break;
        case -5:
            zona_text = " + 5  Pakistan ";
            break;
        case -6:
            zona_text = " + 6  Birmania ";
            break;
        case -7:
            zona_text = " + 7  China ";
            break;
        case -8:
            zona_text = " + 8  Indonecia ";
            break;
        case -9:
            zona_text = " + 9  Japon ";
            break;
        case -10:
            zona_text = " + 10 Australia ";
            break;
        case -11:
            zona_text = " + 11 Australia ";
            break;
        case -12:
            zona_text = " + 12 Russia ";
            break;
        case 0:
            zona_text = " - 0  Iglaterra ";
        case 1:
            zona_text = " - 1  Isalndia ";
            break;
        case 2:
            zona_text = " - 2  Dinamarca ";
            break;
        case 3:
            zona_text = " - 3  Uruguay ";
            break;
        case 4:
            zona_text = " - 4  Venezuela ";
            break;
        case 5:
            zona_text = " - 5  Peru ";
            break;
        case 6:
            zona_text = " - 6  Mexico ";
            break;
        case 7:
            zona_text = " - 7  EEUU ";
            break;
        case 8:
            zona_text = " - 8  CANADA ";
            break;
        case 9:
            zona_text = " - 9  CANADA ";
            break;
        case 10:
            zona_text = " - 10 Alaska ";
            break;
        case 11:
            zona_text = " - 11 Russia ";
            break;
        case 12:
            zona_text = " - 12 Russia ";
    }

    const SetTimeZone = (newTimeZone) => {
        currentTimeZone = newTimeZone;

        switch (currentTimeZone) {
        case -1:
            zona_text = " + 1  Dinamarca ";
            break;
        case -2:
            zona_text = " + 2  Finlandia ";
            break;
        case -3:
            zona_text = " + 3  Turkia ";
            break;
        case -4:
            zona_text = " + 4  Iran ";
            break;
        case -5:
            zona_text = " + 5  Pakistan ";
            break;
        case -6:
            zona_text = " + 6  Birmania ";
            break;
        case -7:
            zona_text = " + 7  China ";
            break;
        case -8:
            zona_text = " + 8  Indonecia ";
            break;
        case -9:
            zona_text = " + 9  Japon ";
            break;
        case -10:
            zona_text = " + 10 Australia ";
            break;
        case -11:
            zona_text = " + 11 Australia ";
            break;
        case -12:
            zona_text = " + 12 Russia ";
            break;
        case 0:
            zona_text = " - 0  Iglaterra ";
        case 1:
            zona_text = " - 1  Isalndia ";
            break;
        case 2:
            zona_text = " - 2  Dinamarca ";
            break;
        case 3:
            zona_text = " - 3  Uruguay ";
            break;
        case 4:
            zona_text = " - 4  Venezuela ";
            break;
        case 5:
            zona_text = " - 5  Peru ";
            break;
        case 6:
            zona_text = " - 6  Mexico ";
            break;
        case 7:
            zona_text = " - 7  EEUU ";
            break;
        case 8:
            zona_text = " - 8  CANADA ";
            break;
        case 9:
            zona_text = " - 9  CANADA ";
            break;
        case 10:
            zona_text = " - 10 Alaska ";
            break;
        case 11:
            zona_text = " - 11 Russia ";
            break;
        case 12:
            zona_text = " - 12 Russia ";
    }
    };

    const Update = async () => {
        //morging
        let morging_open = document.getElementById(
            "open-morning-branchoffice-update-watch"
        ).value;
        let morging_close = document.getElementById(
            "close-morning-branchoffice-update-watch"
        ).value;

        //late
        let late_open = document.getElementById(
            "open-late-branchoffice-update-watch"
        ).value;
        let late_close = document.getElementById(
            "close-late-branchoffice-update-watch"
        ).value;

        //nigth
        let nigth_open = document.getElementById(
            "open-nigth-branchoffice-update-watch"
        ).value;
        let nigth_close = document.getElementById(
            "close-nigth-branchoffice-update-watch"
        ).value;

        //noon
        let noon_open = document.getElementById(
            "open-noon-branchoffice-update-watch"
        ).value;
        let noon_close = document.getElementById(
            "close-noon-branchoffice-update-watch"
        ).value;

        // day morning
        let monday_morning = document.getElementById(
            "monday-morning-branchoffice-update-watch"
        ).checked;
        let tuesday_morning = document.getElementById(
            "tuesday-morning-branchoffice-update-watch"
        ).checked;
        let wedesday_morning = document.getElementById(
            "wedesday-morning-branchoffice-update-watch"
        ).checked;
        let thursday_morning = document.getElementById(
            "thursday-morning-branchoffice-update-watch"
        ).checked;
        let friday_morning = document.getElementById(
            "friday-morning-branchoffice-update-watch"
        ).checked;
        let saturday_morning = document.getElementById(
            "saturday-morning-branchoffice-update-watch"
        ).checked;
        let sunday_morning = document.getElementById(
            "sunday-morning-branchoffice-update-watch"
        ).checked;

        // day late
        let monday_late = document.getElementById(
            "monday-late-branchoffice-update-watch"
        ).checked;
        let tuesday_late = document.getElementById(
            "tuesday-late-branchoffice-update-watch"
        ).checked;
        let wedesday_late = document.getElementById(
            "wedesday-late-branchoffice-update-watch"
        ).checked;
        let thursday_late = document.getElementById(
            "thursday-late-branchoffice-update-watch"
        ).checked;
        let friday_late = document.getElementById(
            "friday-late-branchoffice-update-watch"
        ).checked;
        let saturday_late = document.getElementById(
            "saturday-late-branchoffice-update-watch"
        ).checked;
        let sunday_late = document.getElementById(
            "sunday-late-branchoffice-update-watch"
        ).checked;

        // day nigth
        let monday_nigth = document.getElementById(
            "monday-nigth-branchoffice-update-watch"
        ).checked;
        let tuesday_nigth = document.getElementById(
            "tuesday-nigth-branchoffice-update-watch"
        ).checked;
        let wedesday_nigth = document.getElementById(
            "wedesday-nigth-branchoffice-update-watch"
        ).checked;
        let thursday_nigth = document.getElementById(
            "thursday-nigth-branchoffice-update-watch"
        ).checked;
        let friday_nigth = document.getElementById(
            "friday-nigth-branchoffice-update-watch"
        ).checked;
        let saturday_nigth = document.getElementById(
            "saturday-nigth-branchoffice-update-watch"
        ).checked;
        let sunday_nigth = document.getElementById(
            "sunday-nigth-branchoffice-update-watch"
        ).checked;

        // day noon
        let monday_noon = document.getElementById(
            "monday-noon-branchoffice-update-watch"
        ).checked;
        let tuesday_noon = document.getElementById(
            "tuesday-noon-branchoffice-update-watch"
        ).checked;
        let wedesday_noon = document.getElementById(
            "wedesday-noon-branchoffice-update-watch"
        ).checked;
        let thursday_noon = document.getElementById(
            "thursday-noon-branchoffice-update-watch"
        ).checked;
        let friday_noon = document.getElementById(
            "friday-noon-branchoffice-update-watch"
        ).checked;
        let saturday_noon = document.getElementById(
            "saturday-noon-branchoffice-update-watch"
        ).checked;
        let sunday_noon = document.getElementById(
            "sunday-noon-branchoffice-update-watch"
        ).checked;

        // Hora de apertura menor a hora de cierre

        // chequeo morging
        let check_hours = CheckTime(morging_open, morging_close);
        // chequeo late
        check_hours = CheckTime(late_open, late_close);
        // chequeo nigth
        check_hours = CheckTime(nigth_open, nigth_close);
        // chequeo noon
        check_hours = CheckTime(noon_open, noon_close);

        // Hora del de cierre del turno anterior menor a la hora de apertura del turno actual

        // chequeo noon - > morging
        check_hours = CheckTime(noon_close, morging_open);
        // chequeo morging -> late
        check_hours = CheckTime(morging_close, late_open);
        // chequeo late -> nigth
        check_hours = CheckTime(late_close, nigth_open);
        // chequeo nigth ->
        //check_hours = CheckTime(nigth_close,noon_open)

        if (check_hours) {
            let hours_days = {
                time_zone: currentTimeZone,
                days_noon: {
                    monday: monday_noon,
                    tuesday: tuesday_noon,
                    wedesday: wedesday_noon,
                    thursday: thursday_noon,
                    friday: friday_noon,
                    saturday: saturday_noon,
                    sunday: sunday_noon,
                },
                days_morning: {
                    monday: monday_morning,
                    tuesday: tuesday_morning,
                    wedesday: wedesday_morning,
                    thursday: thursday_morning,
                    friday: friday_morning,
                    saturday: saturday_morning,
                    sunday: sunday_morning,
                },
                days_late: {
                    monday: monday_late,
                    tuesday: tuesday_late,
                    wedesday: wedesday_late,
                    thursday: thursday_late,
                    friday: friday_late,
                    saturday: saturday_late,
                    sunday: sunday_late,
                },
                days_nigth: {
                    monday: monday_nigth,
                    tuesday: tuesday_nigth,
                    wedesday: wedesday_nigth,
                    thursday: thursday_nigth,
                    friday: friday_nigth,
                    saturday: saturday_nigth,
                    sunday: sunday_nigth,
                },
                hours: {
                    noon: {
                        open: noon_open,
                        close: noon_close,
                    },
                    morning: {
                        open: morging_open,
                        close: morging_close,
                    },
                    late: {
                        open: late_open,
                        close: late_close,
                    },
                    nigth: {
                        open: nigth_open,
                        close: nigth_close,
                    },
                },
            };

          

            let update_branch_office = await UpdateBranchOffice(
                $currentDataBranchOffice._id,
                $currentDataBranchOffice._id,
                $loginData._id,
                $currentDataBranchOffice.email,
                $currentDataBranchOffice.name,
                $currentDataBranchOffice.address,
                $currentDataBranchOffice.phone,
                hours_days
            );
            console.log("update_branch_office", update_branch_office);
            // let new_business = await CreateBusiness($loginData._id,name)

            let index_business = $branch_officeAllData.findIndex(
                (b) => b._id == $currentDataBranchOffice._id
            );

            if (index_business !== -1) {
                $branch_officeAllData[index_business] = update_branch_office.data;
                $branch_officeAllData = $branch_officeAllData;
            } else {
                alert(update_branch_office.msg);
            }
            CloseFather();
        } else {
            alert(
                " La hora de apertura tiene que ser menor a la hora de cierre y la hora de cierre del turno actual teien que ser menor a la hora de apertura del turno siguiente"
            );
        }
    };

    const CheckTime = (open, close) => {
        let arrOpen = open.split(":");
        let arrClose = close.split(":");

        let numOpen = parseInt(arrOpen[0] + arrOpen[1]);
        let numClose = parseInt(arrClose[0] + arrClose[1]);

        return numOpen < numClose;
    };
</script>

<ModalContaner title="Actualizar Horario" {CloseFather}>
    <div class="container-center" style="color: white;">
        <div
            style="display: grid; grid-template-columns: auto auto; align-items: center; justify-items: center;"
        >
            <!-- <b>MAÑANA</b> -->
            <div class="btn-day">
                <button class="btn-zona-horaria"> Zona Horaria ({zona_text}) </button>
                <div class="day zona-horaria" style="color: black;">
                    <div
                        on:click={() => {
                            SetTimeZone(12);
                        }}
                    >
                        - 12 Russia
                    </div>
                    <div
                        on:click={() => {
                            SetTimeZone(11);
                        }}
                    >
                        - 11 Russia
                    </div>
                    <div
                        on:click={() => {
                            SetTimeZone(10);
                        }}
                    >
                        - 10 Alaska
                    </div>
                    <div
                        on:click={() => {
                            SetTimeZone(9);
                        }}
                    >
                        - 9 CANADA
                    </div>
                    <div
                        on:click={() => {
                            SetTimeZone(8);
                        }}
                    >
                        - 8 CANADA
                    </div>
                    <div
                        on:click={() => {
                            SetTimeZone(7);
                        }}
                    >
                        - 7 EEUU
                    </div>
                    <div
                        on:click={() => {
                            SetTimeZone(6);
                        }}
                    >
                        - 6 Mexico
                    </div>
                    <div
                        on:click={() => {
                            SetTimeZone(5);
                        }}
                    >
                        - 5 Peru
                    </div>
                    <div
                        on:click={() => {
                            SetTimeZone(4);
                        }}
                    >
                        - 4 Venezuela
                    </div>
                    <div
                        on:click={() => {
                            SetTimeZone(3);
                        }}
                    >
                        - 3 Uruguay
                    </div>
                    <div
                        on:click={() => {
                            SetTimeZone(2);
                        }}
                    >
                        - 2 Dinamarca
                    </div>
                    <div
                        on:click={() => {
                            SetTimeZone(1);
                        }}
                    >
                        - 1 Isalndia
                    </div>
                    <div
                        on:click={() => {
                            SetTimeZone(-0);
                        }}
                    >
                        - 0 Iglaterra
                    </div>
                    <div
                        on:click={() => {
                            SetTimeZone(-1);
                        }}
                    >
                        + 1 Dinamarca
                    </div>
                    <div
                        on:click={() => {
                            SetTimeZone(-2);
                        }}
                    >
                        + 2 Finlandia
                    </div>
                    <div
                        on:click={() => {
                            SetTimeZone(-3);
                        }}
                    >
                        + 3 Turkia
                    </div>
                    <div
                        on:click={() => {
                            SetTimeZone(-4);
                        }}
                    >
                        + 4 Iran
                    </div>
                    <div
                        on:click={() => {
                            SetTimeZone(-5);
                        }}
                    >
                        + 5 Pakistan
                    </div>
                    <div
                        on:click={() => {
                            SetTimeZone(-6);
                        }}
                    >
                        + 6 Birmania
                    </div>
                    <div
                        on:click={() => {
                            SetTimeZone(-7);
                        }}
                    >
                        + 7 China
                    </div>
                    <div
                        on:click={() => {
                            SetTimeZone(-8);
                        }}
                    >
                        + 8 Indonecia
                    </div>
                    <div
                        on:click={() => {
                            SetTimeZone(-9);
                        }}
                    >
                        + 9 Japon
                    </div>
                    <div
                        on:click={() => {
                            SetTimeZone(-10);
                        }}
                    >
                        + 10 Australia
                    </div>
                    <div
                        on:click={() => {
                            SetTimeZone(-11);
                        }}
                    >
                        + 11 Australia
                    </div>
                    <div
                        on:click={() => {
                            SetTimeZone(-12);
                        }}
                    >
                        + 12 Russia
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-center" style="color: white;">
        <b>MAÑANA</b>
    </div>
    <div class="container-center col-3">
        <lable>abre</lable>
        <lable>cierra</lable>
        <lable />
        <input
            type="time"
            id="open-morning-branchoffice-update-watch"
            value={$currentDataBranchOffice.hours_days.hours.morning.open}
        />
        <input
            type="time"
            id="close-morning-branchoffice-update-watch"
            value={$currentDataBranchOffice.hours_days.hours.morning.close}
        />
        <div class="btn-day">
            <button> DIAS </button>
            <div class="day col-2">
                <label for="">Lunes</label>
                <input
                    type="checkbox"
                    id="monday-morning-branchoffice-update-watch"
                    checked={$currentDataBranchOffice.hours_days.days_morning
                        .monday}
                />
                <label for="">Martes</label>
                <input
                    type="checkbox"
                    id="tuesday-morning-branchoffice-update-watch"
                    checked={$currentDataBranchOffice.hours_days.days_morning
                        .tuesday}
                />
                <label for="">Miercoles</label>
                <input
                    type="checkbox"
                    id="wedesday-morning-branchoffice-update-watch"
                    checked={$currentDataBranchOffice.hours_days.days_morning
                        .wedesday}
                />
                <label for="">Jueves</label>
                <input
                    type="checkbox"
                    id="thursday-morning-branchoffice-update-watch"
                    checked={$currentDataBranchOffice.hours_days.days_morning
                        .thursday}
                />
                <label for="">Viernes</label>
                <input
                    type="checkbox"
                    id="friday-morning-branchoffice-update-watch"
                    checked={$currentDataBranchOffice.hours_days.days_morning
                        .friday}
                />
                <label for="">Sabado</label>
                <input
                    type="checkbox"
                    id="saturday-morning-branchoffice-update-watch"
                    checked={$currentDataBranchOffice.hours_days.days_morning
                        .saturday}
                />
                <label for="">Domingo</label>
                <input
                    type="checkbox"
                    id="sunday-morning-branchoffice-update-watch"
                    checked={$currentDataBranchOffice.hours_days.days_morning
                        .sunday}
                />
            </div>
        </div>
    </div>

    <div class="container-center" style="color: white;">
        <b>TARDE</b>
    </div>
    <div class="container-center col-3">
        <lable>abre</lable>
        <lable>cierra</lable>
        <lable />
        <input
            type="time"
            id="open-late-branchoffice-update-watch"
            value={$currentDataBranchOffice.hours_days.hours.late.open}
        />
        <input
            type="time"
            id="close-late-branchoffice-update-watch"
            value={$currentDataBranchOffice.hours_days.hours.late.close}
        />
        <div class="btn-day">
            <button> DIAS </button>
            <div class="day col-2">
                <label for="">Lunes</label>
                <input
                    type="checkbox"
                    id="monday-late-branchoffice-update-watch"
                    checked={$currentDataBranchOffice.hours_days.days_late
                        .monday}
                />
                <label for="">Martes</label>
                <input
                    type="checkbox"
                    id="tuesday-late-branchoffice-update-watch"
                    checked={$currentDataBranchOffice.hours_days.days_late
                        .tuesday}
                />
                <label for="">Miercoles</label>
                <input
                    type="checkbox"
                    id="wedesday-late-branchoffice-update-watch"
                    checked={$currentDataBranchOffice.hours_days.days_late
                        .wedesday}
                />
                <label for="">Jueves</label>
                <input
                    type="checkbox"
                    id="thursday-late-branchoffice-update-watch"
                    checked={$currentDataBranchOffice.hours_days.days_late
                        .thursday}
                />
                <label for="">Viernes</label>
                <input
                    type="checkbox"
                    id="friday-late-branchoffice-update-watch"
                    checked={$currentDataBranchOffice.hours_days.days_late
                        .friday}
                />
                <label for="">Sabado</label>
                <input
                    type="checkbox"
                    id="saturday-late-branchoffice-update-watch"
                    checked={$currentDataBranchOffice.hours_days.days_late
                        .saturday}
                />
                <label for="">Domingo</label>
                <input
                    type="checkbox"
                    id="sunday-late-branchoffice-update-watch"
                    checked={$currentDataBranchOffice.hours_days.days_late
                        .sunday}
                />
            </div>
        </div>
    </div>

    <div class="container-center" style="color: white;">
        <b>NOCHE</b>
    </div>
    <div class="container-center col-3">
        <lable>abre</lable>
        <lable>cierra</lable>
        <lable />
        <input
            type="time"
            id="open-nigth-branchoffice-update-watch"
            value={$currentDataBranchOffice.hours_days.hours.nigth.open}
        />
        <input
            type="time"
            id="close-nigth-branchoffice-update-watch"
            value={$currentDataBranchOffice.hours_days.hours.nigth.close}
        />
        <div class="btn-day">
            <button> DIAS </button>
            <div class="day col-2">
                <label for="">Lunes</label>
                <input
                    type="checkbox"
                    id="monday-nigth-branchoffice-update-watch"
                    checked={$currentDataBranchOffice.hours_days.days_nigth
                        .monday}
                />
                <label for="">Martes</label>
                <input
                    type="checkbox"
                    id="tuesday-nigth-branchoffice-update-watch"
                    checked={$currentDataBranchOffice.hours_days.days_nigth
                        .tuesday}
                />
                <label for="">Miercoles</label>
                <input
                    type="checkbox"
                    id="wedesday-nigth-branchoffice-update-watch"
                    checked={$currentDataBranchOffice.hours_days.days_nigth
                        .wedesday}
                />
                <label for="">Jueves</label>
                <input
                    type="checkbox"
                    id="thursday-nigth-branchoffice-update-watch"
                    checked={$currentDataBranchOffice.hours_days.days_nigth
                        .thursday}
                />
                <label for="">Viernes</label>
                <input
                    type="checkbox"
                    id="friday-nigth-branchoffice-update-watch"
                    checked={$currentDataBranchOffice.hours_days.days_nigth
                        .friday}
                />
                <label for="">Sabado</label>
                <input
                    type="checkbox"
                    id="saturday-nigth-branchoffice-update-watch"
                    checked={$currentDataBranchOffice.hours_days.days_nigth
                        .saturday}
                />
                <label for="">Domingo</label>
                <input
                    type="checkbox"
                    id="sunday-nigth-branchoffice-update-watch"
                    checked={$currentDataBranchOffice.hours_days.days_nigth
                        .sunday}
                />
            </div>
        </div>
    </div>

    <div class="container-center" style="color: white;">
        <b>MADRUGADA</b>
    </div>
    <div class="container-center col-3">
        <lable>abre</lable>
        <lable>cierra</lable>
        <lable />
        <input
            type="time"
            id="open-noon-branchoffice-update-watch"
            value={$currentDataBranchOffice.hours_days.hours.noon.open}
        />
        <input
            type="time"
            id="close-noon-branchoffice-update-watch"
            value={$currentDataBranchOffice.hours_days.hours.noon.close}
        />
        <div class="btn-day">
            <button> DIAS </button>
            <div class="day col-2">
                <label for="">Lunes</label>
                <input
                    type="checkbox"
                    id="monday-noon-branchoffice-update-watch"
                    checked={$currentDataBranchOffice.hours_days.days_noon
                        .monday}
                />
                <label for="">Martes</label>
                <input
                    type="checkbox"
                    id="tuesday-noon-branchoffice-update-watch"
                    checked={$currentDataBranchOffice.hours_days.days_noon
                        .tuesday}
                />
                <label for="">Miercoles</label>
                <input
                    type="checkbox"
                    id="wedesday-noon-branchoffice-update-watch"
                    checked={$currentDataBranchOffice.hours_days.days_noon
                        .wedesday}
                />
                <label for="">Jueves</label>
                <input
                    type="checkbox"
                    id="thursday-noon-branchoffice-update-watch"
                    checked={$currentDataBranchOffice.hours_days.days_noon
                        .thursday}
                />
                <label for="">Viernes</label>
                <input
                    type="checkbox"
                    id="friday-noon-branchoffice-update-watch"
                    checked={$currentDataBranchOffice.hours_days.days_noon
                        .friday}
                />
                <label for="">Sabado</label>
                <input
                    type="checkbox"
                    id="saturday-noon-branchoffice-update-watch"
                    checked={$currentDataBranchOffice.hours_days.days_noon
                        .saturday}
                />
                <label for="">Domingo</label>
                <input
                    type="checkbox"
                    id="sunday-noon-branchoffice-update-watch"
                    checked={$currentDataBranchOffice.hours_days.days_noon
                        .sunday}
                />
            </div>
        </div>
    </div>
    <div class="container-center">
        <button
            on:click={() => {
                Update();
            }}>Actualizar</button
        >
    </div>
</ModalContaner>

<style>
    .container-center {
        display: grid;
        margin: .7rem 4rem;
    }

    .col-2 {
        grid-template-columns: auto auto;
        gap: 0.5rem;
    }
    .col-3 {
        grid-template-columns: auto auto auto;
        gap: 0;
    }

    .day {
        display: none;
        position: absolute;
        z-index: 1;
        background-color: #f9f9f9;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        padding: 0.5rem;
        border-radius: 0.2rem;
        margin-top: 0.1rem;
    }

    .btn-day:hover .day {
        display: grid;
    }

    input[type="time"] {
        height: 2rem;
        padding: 0.3rem;
        outline: none;
        border-radius: 0.2rem;
        border: none;
        margin-right: 0.5rem;
        margin-top: 0.5rem;
    }

    button {
        padding: 0.3rem;
        /* width: 15rem; */
        height: 2rem;
        background-color: rgba(0, 0, 0, 0.418);
        color: white;
        border: none;
        cursor: pointer;
        margin-top: 0.5rem;
        border-radius: 0.2rem;
    }

    .btn-zona-horaria {
        padding: 0.1rem 0.3rem;
    }

    .zona-horaria > div {
        padding: 0.1rem;
        cursor: pointer;
    }

    .zona-horaria > div:hover {
        background-color: #cdcdcd;
        padding: 0.3rem;
        border-radius: 0.2rem;
    }
</style>
