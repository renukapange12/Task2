function solution(D) {
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const result = { Mon:0, Tue:0, Wed:0, Thu:0, Fri:0, Sat:0, Sun:0 };

  
  for (let date in D) {
    const dayIndex = new Date(date).getDay(); 
    const dayName = days[dayIndex];
    result[dayName] += D[date];
  }

  const allDays = Object.keys(result);

  for (let i = 0; i < allDays.length; i++) {
    const day = allDays[i];
    if (result[day] === 0) {
     
      let prev = (i - 1 + 7) % 7;
      while (result[allDays[prev]] === 0 && prev !== i) {
        prev = (prev - 1 + 7) % 7;
      }

      
      let next = (i + 1) % 7;
      while (result[allDays[next]] === 0 && next !== i) {
        next = (next + 1) % 7;
      }

      result[day] = Math.round((result[allDays[prev]] + result[allDays[next]]) / 2);
    }
  }

  return result;
}

// ----------------------
// TEST CASES
// ----------------------

function testSolution() {
  const testCases = [
    {
      input: {
        "2020-01-01": 4,
        "2020-01-02": 2,
        "2020-01-03": 6,
        "2020-01-04": 8,
        "2020-01-05": 2
      },
      expected: {
        Mon: 6,
        Tue: 2,
        Wed: 4,
        Thu: 2,
        Fri: 6,
        Sat: 8,
        Sun: 2
      },
      description: "Basic input with all days present"
    },
    {
      input: {
        "2020-01-01": 6,
        "2020-01-02": 4,
        "2020-01-05": 14,
        "2020-01-07": 4
      },
      expected: "fills missing days with averages",
      description: "Missing Thu & Fri"
    }
  ];

  for (let { input, expected, description } of testCases) {
    console.log(`\n Test: ${description}`);
    const output = solution(input);
    console.log("Input:", input);
    console.log("Output:", output);
  }
}

testSolution();
