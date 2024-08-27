import { DataTable } from 'react-native-paper'

import { Text, View, Image, StyleSheet } from 'react-native'

// import { logo_404 } from '../../assets'
import Colors from '../constants/Colors'
import { logo_404 } from '../assets'


const Table = ({ entries, awayId, homeId }) => {
    

    const var_width = 1.5
    const cellStyle = { flex: var_width, borderRightWidth: 1, borderColor: Colors.border }



    const compareStats = (a, b) => {
        return a.stats.find(stat => stat.name === "rank").value - b.stats.find(stat => stat.name === "rank").value
    }

    entries.sort(compareStats)

    const highlight_team = (id) => {
        return id === awayId || id === homeId ? Colors.highlight : Colors.card

    }

    const get_logo = (team) => {
        const SIZE = 19
        let logo



        if ("team" in team && typeof (team.team) === "object") {

            logo = team.team.logos ? team.team.logos[0].href : false
            if (logo) {
                logo = logo.replace("https://a.espncdn.com/i", `https://a1.espncdn.com/combiner/i?img=/i`)
                logo += `&h=${SIZE + 5}&w=${SIZE + 5}`
            }
        }
        else {

            logo = team.logo ? team.logo[0].href : false
            if (logo) {
                logo = logo.replace("https://a.espncdn.com/i", `https://a1.espncdn.com/combiner/i?img=/i`)
                logo += `&h=${SIZE + 5}&w=${SIZE + 5}`
            }

        }



        return logo ? <Image source={{ uri: logo }} width={SIZE} height={SIZE} /> : <Image source={logo_404} style={{ width: SIZE, height: SIZE }} />
    }


    return (

        <DataTable >
            <DataTable.Header style={{ backgroundColor: "black" }}>

                <DataTable.Title style={{ flex: 1 }}>
                    <Text style={s.tableTitle}>#</Text>
                </DataTable.Title >
                <DataTable.Title style={{ flex: 7 }}>
                    <Text style={s.tableTitle}>Equipo</Text>
                </DataTable.Title>
                <DataTable.Title style={{ flex: var_width }}>
                    <Text style={s.tableTitle}>Pts</Text>
                </DataTable.Title>
                <DataTable.Title style={{ flex: var_width }}>
                    <Text style={s.tableTitle}>PJ</Text>
                </DataTable.Title>
                <DataTable.Title style={{ flex: var_width }}>
                    <Text style={s.tableTitle}>PG</Text>
                </DataTable.Title>
                <DataTable.Title style={{ flex: var_width }}>
                    <Text style={s.tableTitle}>PE</Text>
                </DataTable.Title>
                <DataTable.Title style={{ flex: var_width }}>
                    <Text style={s.tableTitle}>PP</Text>
                </DataTable.Title>
                <DataTable.Title style={{ flex: var_width }}>
                    <Text style={{ color: Colors.text, textAlign: "center" }}>Dif</Text>
                </DataTable.Title>

            </DataTable.Header>



            {
                entries.map((team, i) => (
                    <DataTable.Row key={i} style={[s.row, {backgroundColor: homeId?highlight_team(typeof (team.team) === "object" ? team.team.id : team.id):Colors.card }]}>

                        <DataTable.Cell style={{ flex: 1, borderRightWidth: 1, borderColor: Colors.border }}>

                            <Text style={[{color:Colors.text,textAlign:"center",fontWeight:"500"}]}>
                                {team.stats.find(stat => stat.name === "rank").value}
                            </Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 7, borderRightWidth: 1, borderColor: Colors.border }}>
                            <View style={s.team}>
                                {get_logo(team)}
                                <Text style={s.teamText} numberOfLines={1}>
                                    {typeof (team.team) === "object" ? team.team.shortDisplayName : team.team}
                                </Text>
                            </View>
                        </DataTable.Cell>
                        <DataTable.Cell style={cellStyle}>
                            <Text style={[s.cellText,{fontWeight:"500"}]}>
                                {team.stats.find(stat => stat.name === "points").value}
                            </Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={cellStyle}>
                            <Text style={s.cellText}>
                                {team.stats.find(stat => stat.name === "gamesPlayed").value}
                            </Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={cellStyle}>
                            <Text style={s.cellText}>
                                {team.stats.find(stat => stat.name === "wins").value}
                            </Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={cellStyle}>
                            <Text style={s.cellText}>
                                {team.stats.find(stat => stat.name === "ties").value}
                            </Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={cellStyle}>
                            <Text style={s.cellText}>
                                {team.stats.find(stat => stat.name === "losses").value}
                            </Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: var_width }}>
                            <Text style={s.cellText}>
                                {team.stats.find(stat => stat.name === "pointDifferential").value}
                            </Text>
                        </DataTable.Cell>
                    </DataTable.Row>

                ))
            }

        </DataTable>
    )
}


export default Table


const s = StyleSheet.create({
    tableTitle: {
        color: Colors.text,
        textAlign: "center",
        width: "100%",
    },
    cellText:{
        color:Colors.text,
        textAlign:"center",
        fontSize:12,
        width:"100%"
    },
    row:{
        borderBottomWidth:1,
        borderColor:Colors.border,
        
    },
    team:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        gap:4,
        width:"86%",
        paddingHorizontal:5
    },
    teamText:{
        fontSize:12,
        color:Colors.text
    }
})