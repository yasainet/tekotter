function parseName(html) {
  const nameRegex = /<div class="main_section_info_name">(.+?)（\d+）<\/div>/g;
  const nameMatches = [...html.matchAll(nameRegex)];
  return nameMatches.map(match => match[1]);
}

function parseAge(html) {
  const ageRegex = /<div class="main_section_info_name">.+?（(\d+)）<\/div>/g;
  const ageMatches = [...html.matchAll(ageRegex)];
  return ageMatches.map(match => match[1]);
}

function parseHeight(html) {
  const heightRegex = /T(\d+)/g;
  const heightMatches = [...html.matchAll(heightRegex)];
  return heightMatches.map(match => match[1]);
}

function parseCup(html) {
  const cupRegex = /B\d+\((\w)\)/g;
  const cupMatches = [...html.matchAll(cupRegex)];
  return cupMatches.map(match => match[1]);
}

function parseSchedule(html) {
  const scheduleRegex = /<div class="main_section_info_working_text">(.+?)<\/div>/g;
  const scheduleMatches = [...html.matchAll(scheduleRegex)];
  return scheduleMatches.map(match => match[1]);
}

function parseCastData(html) {
  Logger.log(`Starting parseCastData`);

  const names = parseName(html);
  const ages = parseAge(html);
  const heights = parseHeight(html);
  const cups = parseCup(html);
  const schedules = parseSchedule(html);

  Logger.log(`Names: ${JSON.stringify(names)}`);
  Logger.log(`Ages: ${JSON.stringify(ages)}`);
  Logger.log(`Heights: ${JSON.stringify(heights)}`);
  Logger.log(`Cups: ${JSON.stringify(cups)}`);
  Logger.log(`Schedules: ${JSON.stringify(schedules)}`);

  return names.map((name, index) => {
    const age = ages[index];
    const height = heights[index];
    const cup = cups[index];
    const schedule = schedules[index];
    return { name, age, height, cup, schedule };
  }).filter(item => item.name && item.age && item.height && item.cup && item.schedule);
}