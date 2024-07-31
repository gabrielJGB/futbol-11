import { Image, Text, View } from "react-native"
import { Icon } from "react-native-paper"
import { logo_404, penalty, red_card, goal, own_goal, boot, yellow_card, arrow_in, arrow_out, penaltyMissed } from '../assets/index'
import { convertTimestamp } from "./time"
import { fetch_URL } from "./fetch"

export const getFlag = (item, SIZE) => {
    const slug = item.slug.slice(0, 3)

    const p = 15
    const arr = ['fif', 'afc', 'clu', 'con', 'uef']


    if (arr.includes(slug)) {
        return <Icon source="earth" size={25} color="white" />
    }

    const logo = `https://a1.espncdn.com/combiner/i?img=/i/teamlogos/countries/500/${item.slug.slice(0, 3)}.png?w=${SIZE + p}&h=${SIZE + p}`

    return <Image source={{ uri: logo }} width={SIZE} height={SIZE} />
}

export const getLogo = (team_p, SIZE) => {
    let logo = ""
    const p = 15

    if (team_p) {


        let team = "team" in team_p ? team_p.team : team_p

        if (typeof (team) === "object" && "logo" in team && Array.isArray(team.logo)) {
            logo = team.logo[0].href
            logo = logo.replace("https://a.espncdn.com/i", `https://a1.espncdn.com/combiner/i?img=/i`)
            logo += `&h=${SIZE + p}&w=${SIZE + p}`
            return <Image source={{ uri: logo }} width={SIZE} height={SIZE} />
        }


        if (typeof (team) === "object" && "logo" in team && team.logo != "") {
            logo = team.logo
            logo = logo.replace("https://a.espncdn.com/i", `https://a1.espncdn.com/combiner/i?img=/i`)
            logo += `&h=${SIZE + p}&w=${SIZE + p}`
            return <Image source={{ uri: logo }} width={SIZE} height={SIZE} />
        }

        if (typeof (team) === "object" && "logos" in team && team.logos.length > 0) {

            logo = team.logos.length > 1 ? team.logos[1].href : team.logos[0].href
            logo = logo.replace("https://a.espncdn.com/i", `https://a1.espncdn.com/combiner/i?img=/i`)
            logo += `&h=${SIZE + p}&w=${SIZE + p}`
            return <Image source={{ uri: logo }} width={SIZE} height={SIZE} />

        }



        return <Image source={logo_404} style={{ width: SIZE, height: SIZE }} />
    }

    return <></>
}

export const getStatus = (elem, date) => {
    let status = elem.name

    switch (status) {

        case "STATUS_SCHEDULED":
            return convertTimestamp(date).time;

        case "STATUS_FIRST_HALF":
            return `${elem.detail}`
            // return `${elem.detail} PT`

        case "STATUS_SECOND_HALF":
            return `${elem.detail}`
            // return `${parseInt(elem.detail) - 45}' ST`


        case "STATUS_OVERTIME":
            return "ET Suplem."

        case "STATUS_HALFTIME":
        case "STATUS_HALFTIME_ET":
            return "ET";

        case "STATUS_ABANDONED":
            return "Suspendido"

        case "STATUS_POSTPONED":
            return "Aplazado";

        case "STATUS_IN_PROGRESS":
            return "Jugando"

        case "STATUS_DELAYED":
            return "Retrasado"

        case "STATUS_CANCELED":
            return "Cancelado";

        case "STATUS_SHOOTOUT":
        case "STATUS_END_OF_EXTRATIME":
            return "Penales";

        case "STATUS_FINAL_AGT":
        case "STATUS_FULL_TIME":
            return "Finalizado";

        case "STATUS_FINAL_PEN":
            return "Finalizado\n(Penales)";

        case "STATUS_FINAL_AET":
            return "Finalizado\n(T. Supl.)";

        default:
            return "...";
    }
}

export const translateTitle = (title) => {

    title = title.replace("Argentine", "").replace(",", " -").replace("2024", "")
    title = title.replace("Round of 64", "32avos de final")
    title = title.replace("Round of 32", "16avos de final")
    title = title.replace("Round of 16", "Octavos de final")
    title = title.replace("Round of 8", "Cuartos de final")
    title = title.replace("Ronda de 64", "32avos de final")
    title = title.replace("Ronda de 32", "16avos de final")
    title = title.replace("Ronda de 16", "Octavos de final")
    title = title.replace("Ronda de 8", "Cuartos de final")
    title = title.replace("First Round", "Primera Ronda")
    title = title.replace("Second Round", "Segunda Ronda")
    title = title.replace("Third Round", "Tercera Ronda")
    title = title.replace("Fourth Round", "Cuarta Ronda")
    title = title.replace("Fifth Round", "Quinta Ronda")
    title = title.replace("Club Friendly", "Amistoso")
    title = title.replace("Finals", "Final")
    return title

}


export const getDetailIcon = (detail) => {
    const SIZE_2 = 10
    const SIZE_3 = 13

    if (detail.penaltyKick)
        return <Image source={penalty} style={{ width: SIZE_3, height: SIZE_3 }} />
    else if (detail.redCard)
        return <Image source={red_card} style={{ width: SIZE_2, height: SIZE_2 }} />
    else if (detail.scoringPlay)
        return <Image source={goal} style={{ width: SIZE_2, height: SIZE_2 }} />
}


export const getSofaData = async (selectedDate) => {

    try {
        const sofaDate = convertTimestamp(selectedDate)
        const formatedDate = `${sofaDate.year}-${sofaDate.monthNum}-${sofaDate.day.toString().padStart(2, '0')}`

     
        const data = await fetch_URL(`https://api.sofascore.com/api/v1/sport/football/scheduled-events/${formatedDate}`)
            .then(resp => resp.events.map(game => {
                return { id: game.id, homeTeam: game.homeTeam, awayTeam: game.awayTeam }
            }))
            .catch(error => { return false })

        return data

    } catch (error) {
        throw Error("")
    }

}


export const getSofaId = (game, sofaEvents) => {

    if (game) {


        const home = game.header.competitions[0].competitors[0].team
        const away = game.header.competitions[0].competitors[1].team


        const respId = sofaEvents?.find(event =>
            (
                event.homeTeam.name.toLowerCase().trim() === home.displayName.toLowerCase().trim() ||
                event.homeTeam.shortName.toLowerCase().trim() === home.name.toLowerCase().trim() ||
                event.homeTeam.nameCode.toLowerCase().trim() === home.abbreviation.toLowerCase().trim()) &&

            (
                event.awayTeam.name.toLowerCase().trim() === away.displayName.toLowerCase().trim() ||
                event.awayTeam.shortName.toLowerCase().trim() === away.name.toLowerCase().trim() ||
                event.awayTeam.nameCode.toLowerCase().trim() === away.abbreviation.toLowerCase().trim())
        ) || false

        

        return (respId ? respId.id : false)
    }

}

export const getPlayImg = (play) => {

    if (play.penaltyKick)
        if (play.didScore)
            return penalty
        else
            return penaltyMissed
    else if (play.ownGoal)
        return own_goal
    else if (play.didScore)
        return goal
    else if (play.didAssist)
        return boot
    else if (play.redCard)
        return red_card
    else if (play.yellowCard)
        return yellow_card
    else
        return false
    // else if (play.substitution)
    //     return p_in ? <Icon source={"chevron-right"} size={22} color='lime' /> : <Icon source={"chevron-left"} size={22} color='red' />


}



export const getPlayerColor = (position) => {

    if (!position)
        return "#808080"

    if (position.displayName === "Arquero")
        return "#FF8700"

    else if (position.displayName.includes("Defensor") || position.displayName.includes("Lateral") || position.displayName.includes("defensivo") || position.displayName.includes("Líbero"))
        return "#20b4ff"

    else if (position.displayName.includes("Mediocampista"))
        return "#42d515"

    else if (position.displayName.includes("Atacante") || position.displayName.includes("Enganche"))
        return "#df1d1e"
    else
        return "#808080"

}

export const formatStat = (stat) => {

    switch (stat.shortDisplayName) {
        case "FC":
            return stat.value === 1 ? "Falta cometida" : "Faltas cometidas"
        case "FS":
            return stat.value === 1 ? "Falta recibida" : "Faltas recibidas"
        case "EC":
            return stat.value === 1 ? "Gol en contra" : "Goles en contra"
        case "TR":
            return stat.value === 1 ? "Tarjeta roja" : "Tarjetas rojas"
        case "TA":
            return stat.value === 1 ? "Tarjeta amailla" : "Tarjetas amaillas"
        case "GA":
            return stat.value === 1 ? "Gol recibido" : "Goles recibidos"
        case "SHF":
            return stat.value === 1 ? "Remate recibido" : "Remates recibidos"
        case "A":
            return stat.value === 1 ? "Asistencia" : "Asistencias"
        case "OF":
            return "Fuera de juego"
        case "ST":
            return stat.value === 1 ? "Remate preciso" : "Remates precisos"
        case "G":
            return stat.value === 1 ? "Gol" : "Goles"
        case "SH":
            return stat.value === 1 ? "Remate en total" : "Remates en total"
        case "SV":
            return stat.value === 1 ? "Atajada" : "Atajadas"

    }

    stat.displayName.replace("Shots Faced", "Tiros recibidos").replace("Concedidos", "Recibidos").replace("a meta", "al arco").replace("Total de goles", "Goles")
}




export const getEventColor = (id) => {

    switch (id) {
        case '94':
            return "#ECF900"

        case '93':
            return "#E60200"
        case '138':
        case '98':
        case '137':
        case '70':
        case '173':
        case '97':
            return "#00E903"

        default:
            return "#FFFFFF"

    }
}

export const getEventIcon = (id, i) => {
    const sub_imgs = [arrow_in, arrow_out]
    const score_imgs = [goal, boot]
    const foul = ["De", "A"]
    const SIZE = 14


    switch (id) {
        case '94':
            return <Image source={yellow_card} style={{ width: SIZE, height: SIZE }} />

        case '93':
            return <Image source={red_card} style={{ width: SIZE, height: SIZE }} />

        case '76':
            return <Image source={sub_imgs[i]} style={{ width: SIZE, height: SIZE }} />

        case '36':
        case '66':
            return ""
            return <Text style={{ color: "white" }}> {foul[i]}</Text>

        case '138':
        case '98':
        case '137':
        case '70':
        case '173':
        case '97':
            return <Image source={score_imgs[i]} style={{ width: SIZE, height: SIZE }} />

        default:
            return <View></View>

    }

}


export const translateEventText = (text) => {

    switch (text) {
        case "Goal - Free-kick":
            return "Gol de tiro libre"

        case "Gol, anotación":
            return "Gol"
        case "Tiro a la meta":
            return "Tiro al arco"
        case "Balón mano":
            return "Mano"
        case "Fuera de lugar":
            return "Fuera de juego"
        case "Penal - Anotado":
            return "Penal convertido"
        case "Shot Hit Woodwork":
            return "Tiro en el travesáneo"
        case "Goal - Volley":
            return "Gol de volea"
        case "Penalty - Saved":
            return "Penal atajado"
        case "Penal -Errado":
            return "Penal fallado"
        case "VAR - Referee decision cancelled":
            return "El VAR anuló la desición del árbitro"
        case "Start 2nd Half Extra Time":
            return "Inicio del segundo tiempo extra"
        case "Start Extra Time":
            return "Inicio del tiempo extra"
        case "End Extra Time":
            return "Final del tiempo extra"
        case "Start Shootout":
            return "Inicio de la tanda de penales"
        case "Throw in":
            return "Saque lateral"
        default:
            return text
    }

}



export const translateStatLabel = (label) => {

    switch (label) {
        case "Fouls":
            return "Faltas"
        case "Corner Kicks":
            return "Tiros de esquina"
        case "Possession":
            return "% Posesión"
        case "POSSESSION":
            return "% Posesión"
        case "Fuera de Lugar":
            return "Fuera de Juego"
        case "Salvadas":
            return "Atajadas"
        case "TIROS":
            return "Tiros totales"
        case "SHOTS":
            return "Tiros totales"
        case "ON GOAL":
            return "Tiros al arco"
        case "A GOL":
            return "Tiros al arco"
        case "On Target %":
            return "% Tiros al arco"
        case "% al arco":
            return "Tiros"
        case "Penalty Goals":
            return "Goles de penal"
        case "Penalty Kicks Taken":
            return "Penales atajados"
        case "Accurate Passes":
            return "Pases precisos"
        case "Passes":
            return "Pases"
        case "Pass Completion %":
            return "% Pases completados"
        case "Accurate Crosses":
            return "Centros precisos"

        case "Cross %":
            return "% Centros"
        case "Crosses":
            return "Centros"
        case "Tackles":
            return "Barridas"
        case "Tackle %":
            return "% Barridas"

        case "Effective Tackles":
            return "Barridas efectivas"

        case "Blocked Shots":
            return "Tiros bloqueados"
        case "Long Balls %":
            return "% Pases aereos"
        case "Accurate Long Balls":
            return "Pases aereos precisos"

        case "Long Balls":
            return "Pases arereos"

        case "Clearances":
            return "Despejes"
        case "Effective Clearances":
            return "Despejes efectivos"

        case "Interceptions":
            return "Intercepciones"


        default:
            return label
    }

}


export const sortRoster = (roster) => {

    // const order = ["G", "LI", "DCI", "DC", "DCD", "LD", "MI", "MCI", "MCD", "MD", "MO", "MI", "MCI", "MC", "MO", "MCD", "MD", "ACI", "ACD", "AI", "ACI", "A", "ACD", "AD"];
 
    const order = ["G", "LI", "DCI","D", "DC", "DCD", "LD","L", "MI", "MCI", "MC", "MO", "MCD", "MD","M","AI", "ACI", "A", "ACD","AD"];


    // const order = ["G", "LI", "DCI", "DC", "DCD", "LD", "MI","MD","MI","MO","MD","A"]

    const sortedJson = roster.sort((a, b) => {
        const indexA = a.position?.abbreviation ? order.indexOf(a.position?.abbreviation) : -1;
        const indexB = b.position?.abbreviation ? order.indexOf(b.position?.abbreviation) : -1;


        if (indexA === -1 && indexB === -1) return 0;
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;

        return indexA - indexB;
    });




    return sortedJson

}




export const gamePlaying = objeto => {

    if (objeto.hasOwnProperty("state") && objeto["state"] === "in") {
        return true;
    }

    for (let propiedad in objeto) {
        if (objeto[propiedad] !== null && typeof objeto[propiedad] === "object") {
            let resultado = gamePlaying(objeto[propiedad], "state");
            if (resultado) {
                return true;
            }
        }
    }

    return false;
}