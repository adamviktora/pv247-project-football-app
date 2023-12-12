import { add } from "@/fetch-helper/CRUD";
import { ClubCreation } from "@/types/creationTypes";
import { Club } from "@prisma/client";

const premierLeagueClubs: ClubCreation[] = [
  {
    name: "Arsenal",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png",
    countryCode: "ENG",
  },
  {
    name: "Manchester United",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png",
    countryCode: "ENG",
  },
  {
    name: "Liverpool",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png",
    countryCode: "ENG",
  },
  {
    name: "Chelsea",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png",
    countryCode: "ENG",
  },
  {
    name: "Manchester City",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png",
    countryCode: "ENG",
  },
  {
    name: "Tottenham Hotspur",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Tottenham_Hotspur.svg/1200px-Tottenham_Hotspur.svg.png",
    countryCode: "ENG",
  },
  {
    name: "Leicester City",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Leicester_City_crest.svg/1200px-Leicester_City_crest.svg.png",
    countryCode: "ENG",
  },
  {
    name: "West Ham United",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/West_Ham_United_FC_logo.svg/1200px-West_Ham_United_FC_logo.svg.png",
    countryCode: "ENG",
  },
  {
    name: "Everton",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Everton_FC_logo.svg/1200px-Everton_FC_logo.svg.png",
    countryCode: "ENG",
  },
  {
    name: "Aston Villa",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Aston_Villa_FC_crest_%282016%29.svg/1200px-Aston_Villa_FC_crest_%282016%29.svg.png",
    countryCode: "ENG",
  },
  {
    name: "Newcastle United",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Newcastle_United_Logo.svg/1200px-Newcastle_United_Logo.svg.png",
    countryCode: "ENG",
  },
  {
    name: "Wolverhampton Wanderers",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/f/fc/Wolverhampton_Wanderers.svg/1200px-Wolverhampton_Wanderers.svg.png",
    countryCode: "ENG",
  },
  {
    name: "Crystal Palace",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Crystal_Palace_FC_logo.svg/1200px-Crystal_Palace_FC_logo.svg.png",
    countryCode: "ENG",
  },
  {
    name: "Southampton",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/FC_Southampton.svg/1200px-FC_Southampton.svg.png",
    countryCode: "ENG",
  },
  {
    name: "Burnley",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Burnley_FC_badge.png/1200px-Burnley_FC_badge.png",
    countryCode: "ENG",
  },
  {
    name: "Brighton & Hove Albion",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Brighton_%26_Hove_Albion_logo.svg/1200px-Brighton_%26_Hove_Albion_logo.svg.png",
    countryCode: "ENG",
  },
  {
    name: "Fulham",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Fulham_FC_%28shield%29.svg/1200px-Fulham_FC_%28shield%29.svg.png",
    countryCode: "ENG",
  },
  {
    name: "West Bromwich Albion",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/West_Bromwich_Albion.svg/1200px-West_Bromwich_Albion.svg.png",
    countryCode: "ENG",
  },
  {
    name: "Sheffield United",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/Sheffield_United_FC_logo.svg/1200px-Sheffield_United_FC_logo.svg.png",
    countryCode: "ENG",
  },
  {
    name: "Leeds United",
    logoURL:
      "https://cdn.freebiesupply.com/logos/large/2x/leeds-united-afc-3-logo-png-transparent.png",
    countryCode: "ENG",
  },
];

const bundesligaClubs: ClubCreation[] = [
  {
    name: "Bayern Munich",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Logo_FC_Bayern_M%C3%BCnchen_%282002%E2%80%932017%29.svg/1200px-Logo_FC_Bayern_M%C3%BCnchen_%282002%E2%80%932017%29.svg.png",
    countryCode: "GER",
  },
  {
    name: "Borussia Dortmund",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/1200px-Borussia_Dortmund_logo.svg.png",
    countryCode: "GER",
  },
  {
    name: "RB Leipzig",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/RB_Leipzig_2014_logo.svg/1200px-RB_Leipzig_2014_logo.svg.png",
    countryCode: "GER",
  },
  {
    name: "Bayer Leverkusen",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/5/59/Bayer_04_Leverkusen_logo.svg/1200px-Bayer_04_Leverkusen_logo.svg.png",
    countryCode: "GER",
  },
  {
    name: "Schalke 04",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/FC_Schalke_04_Logo.svg/1200px-FC_Schalke_04_Logo.svg.png",
    countryCode: "GER",
  },
  {
    name: "Borussia Mönchengladbach",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Borussia_M%C3%B6nchengladbach_logo.svg/1200px-Borussia_M%C3%B6nchengladbach_logo.svg.png",
    countryCode: "GER",
  },
  {
    name: "VfL Wolfsburg",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Logo-VfL-Wolfsburg.svg/1200px-Logo-VfL-Wolfsburg.svg.png",
    countryCode: "GER",
  },
  {
    name: "Eintracht Frankfurt",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Eintracht_Frankfurt_Logo.svg/1200px-Eintracht_Frankfurt_Logo.svg.png",
    countryCode: "GER",
  },
  {
    name: "Hertha BSC",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Hertha_BSC_Logo_2012.svg/1200px-Hertha_BSC_Logo_2012.svg.png",
    countryCode: "GER",
  },
  {
    name: "1. FC Köln",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/FC_Cologne_logo.svg/1200px-FC_Cologne_logo.svg.png",
    countryCode: "GER",
  },
  {
    name: "FC Augsburg",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/5/59/FC_Augsburg_logo.svg/1200px-FC_Augsburg_logo.svg.png",
    countryCode: "GER",
  },
  {
    name: "1. FSV Mainz 05",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Logo_Mainz_05.svg/1200px-Logo_Mainz_05.svg.png",
    countryCode: "GER",
  },
  {
    name: "SC Freiburg",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/SC_Freiburg_logo_2014.svg/1200px-SC_Freiburg_logo_2014.svg.png",
    countryCode: "GER",
  },
  {
    name: "FC Union Berlin",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/1._FC_Union_Berlin_1966_-_1990.svg/1200px-1._FC_Union_Berlin_1966_-_1990.svg.png",
    countryCode: "GER",
  },
  {
    name: "VfB Stuttgart",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/VfB_Stuttgart_1893_Logo.svg/1200px-VfB_Stuttgart_1893_Logo.svg.png",
    countryCode: "GER",
  },
  {
    name: "Arminia Bielefeld",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Logo_DSC_Arminia_Bielefeld.svg/1200px-Logo_DSC_Arminia_Bielefeld.svg.png",
    countryCode: "GER",
  },
];

const serieAClubs: ClubCreation[] = [
  {
    name: "Juventus",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Juventus_FC_2017_logo.svg/1200px-Juventus_FC_2017_logo.svg.png",
    countryCode: "ITA",
  },
  {
    name: "AC Milan",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/AC_Milan.svg/1200px-AC_Milan.svg.png",
    countryCode: "ITA",
  },
  {
    name: "Inter Milan",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Inter_Milan.svg/1200px-Inter_Milan.svg.png",
    countryCode: "ITA",
  },
  {
    name: "AS Roma",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/32/AS_Roma_logo_%282017%29.svg/1200px-AS_Roma_logo_%282017%29.svg.png",
    countryCode: "ITA",
  },
  {
    name: "Napoli",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/2/21/S.S.C._Napoli_logo.svg/1200px-S.S.C._Napoli_logo.svg.png",
    countryCode: "ITA",
  },
  {
    name: "Lazio",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/SS_Lazio_logo_%282%29.svg/1200px-SS_Lazio_logo_%282%29.svg.png",
    countryCode: "ITA",
  },
  {
    name: "Atalanta",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Atalanta_B.C._logo.svg/1200px-Atalanta_B.C._logo.svg.png",
    countryCode: "ITA",
  },
  {
    name: "AC Fiorentina",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/ACF_Fiorentina_2.svg/1200px-ACF_Fiorentina_2.svg.png",
    countryCode: "ITA",
  },
  {
    name: "Sassuolo",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/U.S._Sassuolo_Calcio_logo.svg/1200px-U.S._Sassuolo_Calcio_logo.svg.png",
    countryCode: "ITA",
  },
  {
    name: "Sampdoria",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Sampdoria_logo.svg/1200px-Sampdoria_logo.svg.png",
    countryCode: "ITA",
  },
];

const ligue1Clubs: ClubCreation[] = [
  {
    name: "Paris Saint-Germain",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/8/86/Paris_Saint-Germain_FC.svg/1200px-Paris_Saint-Germain_FC.svg.png",
    countryCode: "FRA",
  },
  {
    name: "Olympique de Marseille",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/43/Olympique_Marseille_logo.svg/1200px-Olympique_Marseille_logo.svg.png",
    countryCode: "FRA",
  },
  {
    name: "AS Monaco",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/AS_Monaco_FC.svg/1200px-AS_Monaco_FC.svg.png",
    countryCode: "FRA",
  },
  {
    name: "Lille OSC",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/62/Logo_LOSC_Lille.svg/1200px-Logo_LOSC_Lille.svg.png",
    countryCode: "FRA",
  },
  {
    name: "Olympique Lyonnais",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Olympique_Lyonnais.svg/1200px-Olympique_Lyonnais.svg.png",
    countryCode: "FRA",
  },
  {
    name: "Stade Rennais FC",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Stade_Rennais_FC.svg/1200px-Stade_Rennais_FC.svg.png",
    countryCode: "FRA",
  },
  {
    name: "OGC Nice",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/OGC_Nice.svg/1200px-OGC_Nice.svg.png",
    countryCode: "FRA",
  },
  {
    name: "AS Saint-Étienne",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/AS_Saint-Étienne.svg/1200px-AS_Saint-Étienne.svg.png",
    countryCode: "FRA",
  },
  {
    name: "Girondins de Bordeaux",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/FC_Girondins_de_Bordeaux_logo.svg/1200px-FC_Girondins_de_Bordeaux_logo.svg.png",
    countryCode: "FRA",
  },
  {
    name: "RC Lens",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/RC_Lens.svg/1200px-RC_Lens.svg.png",
    countryCode: "FRA",
  },
  {
    name: "FC Nantes",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/FC_Nantes_logo.svg/1200px-FC_Nantes_logo.svg.png",
    countryCode: "FRA",
  },
  {
    name: "Montpellier HSC",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Montpellier_H%C3%A9rault_Sport_Club_logo.svg/1200px-Montpellier_H%C3%A9rault_Sport_Club_logo.svg.png",
    countryCode: "FRA",
  },
  {
    name: "Strasbourg",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Racing_Club_de_Strasbourg_Alsace.svg/1200px-Racing_Club_de_Strasbourg_Alsace.svg.png",
    countryCode: "FRA",
  },
  {
    name: "Angers SCO",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Angers_SCO.svg/1200px-Angers_SCO.svg.png",
    countryCode: "FRA",
  },
  {
    name: "Stade Brestois 29",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/e/ea/Stade_Brestois_29.svg/1200px-Stade_Brestois_29.svg.png",
    countryCode: "FRA",
  },
  {
    name: "Metz",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/76/FC_Metz_1921.svg/1200px-FC_Metz_1921.svg.png",
    countryCode: "FRA",
  },
  {
    name: "FC Lorient",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/FC_Lorient_logo.svg/1200px-FC_Lorient_logo.svg.png",
    countryCode: "FRA",
  },
  {
    name: "Dijon FCO",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Dijon_Football_C%C3%B4te-d%27Or.svg/1200px-Dijon_Football_C%C3%B4te-d%27Or.svg.png",
    countryCode: "FRA",
  },
  {
    name: "Nîmes Olympique",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/Nimes_Olympique_2019_logo.svg/1200px-Nimes_Olympique_2019_logo.svg.png",
    countryCode: "FRA",
  },
  {
    name: "AS Nancy Lorraine",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/93/ASNL_logo.svg/1200px-ASNL_logo.svg.png",
    countryCode: "FRA",
  },
  {
    name: "Troyes AC",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/ESTAC_Troyes_logo.svg/1200px-ESTAC_Troyes_logo.svg.png",
    countryCode: "FRA",
  },
];

const spanishClubs: ClubCreation[] = [
  {
    name: "Real Madrid",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
    countryCode: "ESP",
  },
  {
    name: "FC Barcelona",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png",
    countryCode: "ESP",
  },
  {
    name: "Atletico Madrid",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Atletico_Madrid_2017_logo.svg/1200px-Atletico_Madrid_2017_logo.svg.png",
    countryCode: "ESP",
  },
  {
    name: "Sevilla FC",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/8/86/Sevilla_FC_logo.svg/1200px-Sevilla_FC_logo.svg.png",
    countryCode: "ESP",
  },
  {
    name: "Valencia CF",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Valencia_CF.svg/1200px-Valencia_CF.svg.png",
    countryCode: "ESP",
  },
  {
    name: "Real Sociedad",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/5/55/Real_Sociedad_logo.svg/1200px-Real_Sociedad_logo.svg.png",
    countryCode: "ESP",
  },
  {
    name: "Villarreal CF",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Villarreal_CF_logo.svg/1200px-Villarreal_CF_logo.svg.png",
    countryCode: "ESP",
  },
  {
    name: "Athletic Bilbao",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Athletic_Club_Bilbao_logo.svg/1200px-Athletic_Club_Bilbao_logo.svg.png",
    countryCode: "ESP",
  },
  {
    name: "Real Betis",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/43/Real_Betis_logo.svg/1200px-Real_Betis_logo.svg.png",
    countryCode: "ESP",
  },
  {
    name: "Celta Vigo",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/43/RC_Celta_de_Vigo_logo.svg/1200px-RC_Celta_de_Vigo_logo.svg.png",
    countryCode: "ESP",
  },
  {
    name: "Getafe CF",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/7f/Getafe_CF_logo.svg/1200px-Getafe_CF_logo.svg.png",
    countryCode: "ESP",
  },
  {
    name: "Eibar",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/SD_Eibar_logo.svg/1200px-SD_Eibar_logo.svg.png",
    countryCode: "ESP",
  },
  {
    name: "Real Valladolid",
    logoURL:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Real_Valladolid_Logo.svg/1200px-Real_Valladolid_Logo.svg.png",
    countryCode: "ESP",
  },
];

const allClubs: ClubCreation[] = [
  ...premierLeagueClubs,
  ...bundesligaClubs,
  ...serieAClubs,
  ...ligue1Clubs,
  ...spanishClubs,
];

export const createClubs = () => {
  allClubs.forEach(async (club) => {
    const created = await add<ClubCreation, Club>("club", club);
    console.log(`Created: ${created.name} with id ${created.id}`);
  });
};
