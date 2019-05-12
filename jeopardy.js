const categories = {
  'Sci-Fi Stuff': {
    title: 'Sci-Fi Stuff',
    clues: {
      200: {
        clue: `The latex prosthetic ears worn by this "Star Trek" actor in the late '60s even have some residual makeup left on them`,
        value: 200,
        buttons: [
          { text: `Patrick Stewart`, correct: false },
          { text: `Leonard Nimoy`, correct: true },
          { text: `William Shatner`, correct: false }
        ]
      },
      400: {
        clue: `The piece here is really green cast resin in crystal form, but in "Superman III", it was called this, & appeared onscreen with Christopher Reeve`,
        value: 400,
        buttons: [
          { text: `Kryptonite`, correct: true },
          { text: `Flubber`, correct: false },
          { text: `Infinity Stone`, correct: false }
        ]
      },
      600: {
        clue: `Seen in Dr. Zaius' private chambers, the Lawgiver statue from this 1968 film looks to be stone, but is actually made of cast & carved rigid polyfoam`,
        value: 600,
        buttons: [
          { text: `Star Wars`, correct: false },
          { text: `Planet of the Apes`, correct: true },
          { text: `Infinity Stone`, correct: false }
        ]
      }
    }
  },
  'TV Shows By Couple': {
    title: 'TV Shows By Couple',
    clues: {
      200: {
        clue: `Monica & Chandler `,
        value: 200,
        buttons: [
          { text: `Happy Days`, correct: false },
          { text: `Cheers`, correct: false },
          { text: `Friends`, correct: true }
        ]
      },
      400: {
        clue: `Carrie & Mr. Big`,
        value: 400,
        buttons: [
          { text: `Night Court`, correct: false },
          { text: `Sex and the City`, correct: true },
          { text: `Mork & Mindy`, correct: false }
        ]
      },
      600: {
        clue: `Jim Halpert & Pam Beesly, who hooked up at work`,
        value: 600,
        buttons: [
          { text: `The Office`, correct: true },
          { text: `The IT Crowd`, correct: false },
          { text: `Parks and Recreation`, correct: false }
        ]
      }
    }
  },
  'Mother Goose': {
    title: 'Mother Goose',
    clues: {
      200: {
        clue: `They were the "Three Men in a Tub`,
        value: 200,
        buttons: [
          { text: `The butcher, the baker, the candlestick maker`, correct: true },
          { text: `The painter, the baker, the candlestick maker`, correct: false },
          { text: `The butcher, the caretaker, the candlestick maker`, correct: false }
        ]
      },
      400: {
        clue: `March winds & April showers brings forth these`,
        value: 400,
        buttons: [
          { text: `May Flowers`, correct: true },
          { text: `May Days`, correct: false },
          { text: `May Summers`, correct: false }
        ]
      },
      600: {
        clue: `After "Jack fell down and broke his crown", he "went to bed to mend his head" using brown paper & this liquid`,
        value: 600,
        buttons: [
          { text: `Vinegar`, correct: true },
          { text: `Milk`, correct: false },
          { text: `Molasses`, correct: false }
        ]
      }
    }
  }
}

const game = {
  score: 0
}

const $board = document.getElementById('board')
const $overlay = document.getElementById('overlay')
const $score = document.getElementById('score')

const board = []

for (const category in categories) {
  board.push(`<div class="category">`)
  board.push(`<div class="title">${category}</div>`)

  for (const clue in categories[category].clues) {
    board.push(`<div class="value" data-category="${category}" data-clue="${clue}">${clue}</div>`)
  }
  board.push(`</div>`)
}

$board.innerHTML = board.join('')

$board.addEventListener('click', function (e) {
  if (e.target.classList.contains('value')) {
    const category = e.target.dataset.category
    const clue = e.target.dataset.clue

    const overlay = []

    overlay.push(`<div class="clue">${categories[category].clues[clue].clue}</div>`)
    overlay.push(`<div id="responses" class="responses">`)

    for (const button of categories[category].clues[clue].buttons) {
      console.log(button)
      overlay.push(`<button class="button" data-value="${categories[category].clues[clue].value} data-correct="${button.correct}">${button.text}</button>`)
    }

    overlay.push(`<button id="pass" class="button pass">Pass</button>`)
    overlay.push(`</div>`)

    $overlay.innerHTML = overlay.join('')

    $overlay.classList.add('show')
  }
})

$overlay.addEventListener('click', function (e) {
  if (e.target.classList.contains('button')) {
    if (!e.target.classList.contains('pass')) {
      game.score += e.target.dataset.correct ? parseInt(e.target.dataset.value) : -parseInt(e.target.dataset.value)
    }

    $score.textContent = game.score

    $overlay.classList.remove('show')
  }
})
