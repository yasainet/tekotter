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

function parseCastData(html) {
  Logger.log(`Starting parseCastData`);

  const names = parseName(html);
  const ages = parseAge(html);
  const heights = parseHeight(html);
  const cups = parseCup(html);

  const castData = names.map((name, index) => {
    const age = ages[index];
    const height = heights[index];
    const cup = cups[index];
    return { name, age, height, cup };
  }).filter(item => item.name && item.age && item.height && item.cup);

  Logger.log(`Parsed cast data: ${JSON.stringify(castData)}`);
  return castData;
}