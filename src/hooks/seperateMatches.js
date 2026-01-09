export const separateMatchesByInplay = (data) => {
  let inplayMatches = []; // Stores competitions where at least one match is inplay = true
  let upcomingMatches = []; // Stores competitions where at least one match is inplay = false

  data.forEach((competition) => {
    let competitionData1 = { ...competition, series: [] };
    let competitionData2 = { ...competition, series: [] };

    competition.series.forEach((series) => {
      let seriesData1 = { ...series, matches: [] };
      let seriesData2 = { ...series, matches: [] };

      series.matches.forEach((match) => {
        if (match.inplay) {
          seriesData1.matches.push(match);
        } else {
          seriesData2.matches.push(match);
        }
      });

      if (seriesData1.matches.length > 0) {
        competitionData1.series.push(seriesData1);
      }
      if (seriesData2.matches.length > 0) {
        competitionData2.series.push(seriesData2);
      }
    });

    if (competitionData1.series.length > 0) {
      inplayMatches.push(competitionData1);
    }
    if (competitionData2.series.length > 0) {
      upcomingMatches.push(competitionData2);
    }
  });

  return { inplayMatches, upcomingMatches };
};
