// ---------------------------------------------------
// -- Sequence Names / Tags / Dictionary
//

const sequence_tag_temporal = {
  '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0': 'training-1',
  '0, 3, 5, 1, 4, 3, 3, 2, 0, 5, 3, 0': 'training-2',
  '0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3': 'training-3',
  '1, 4, 5, 2, 5, 2, 3, 0, 0, 4, 1, 3': 'training-4',

  '0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1': 'Rep2',
  '0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1': 'CRep2', // CREP2

  // - distance between two points = 2
  '0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2': 'Rep2',
  '0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2': 'CRep2', // CREP2

  // - distance between two points = 3
  '0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3': 'Rep2',
  '0, 3, 3, 3, 3, 0, 0, 3, 0, 0, 0, 3': 'CRep2', // CREP2

  // ----- REP3
  // Rotation cluster form
  '0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2': 'Rep3', // REP3
  '0, 1, 2, 0, 2, 1, 1, 2, 0, 1, 0, 2': 'CRep3', // CREP3

  // Triangle + rotation form
  '0, 2, 4, 0, 2, 4, 0, 2, 4, 0, 2, 4': 'Rep3', // REP3
  '0, 2, 4, 0, 4, 2, 2, 4, 0, 2, 0, 4': 'CRep3', // CREP3

  // 2 groups
  '0, 5, 3, 0, 5, 3, 0, 5, 3, 0, 5, 3': 'Rep3', // REP3
  '0, 5, 3, 0, 3, 5, 5, 3, 0, 5, 0, 3': 'CRep3', // CREP3

  // ----- REP4
  // Rotation +1
  '0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3': 'Rep4', // REP4
  '0, 1, 2, 3, 2, 1, 3, 0, 0, 3, 1, 2': 'CRep4', // CREP4

  // Zhang geometrical shape-23
  '0, 2, 5, 3, 0, 2, 5, 3, 0, 2, 5, 3': 'Rep4', // REP4
  '0, 2, 5, 3, 5, 2, 3, 0, 0, 3, 2, 5': 'CRep4', // CREP4

  // Zhang geometrical shape-30
  '0, 3, 2, 5, 0, 3, 2, 5, 0, 3, 2, 5': 'Rep4', // REP4
  '0, 3, 2, 5, 2, 3, 5, 0, 0, 5, 3, 2': 'CRep4', // CREP4

  // ---- REP-Nested
  // Rotation +1
  '0, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2': 'Rep-Nested', // REP-Nested
  '0, 1, 2, 0, 2, 1, 0, 1, 2, 0, 2, 1': 'CRep-Global', // REP-Global
  '0, 0, 1, 1, 2, 2, 0, 0, 2, 2, 1, 1': 'CRep-Local', // REP-Local

  // Triangle + rotation form
  '0, 0, 2, 2, 4, 4, 0, 0, 2, 2, 4, 4': 'Rep-Nested', // REP-Nested
  '0, 2, 4, 0, 4, 2, 0, 2, 4, 0, 4, 2': 'CRep-Global', // REP-Global
  '0, 0, 2, 2, 4, 4, 0, 0, 4, 4, 2, 2': 'CRep-Local', // REP-Local

  // 2 groups
  '0, 0, 5, 5, 3, 3, 0, 0, 5, 5, 3, 3': 'Rep-Nested', // REP-Nested
  '0, 5, 3, 0, 3, 5, 0, 5, 3, 0, 3, 5': 'CRep-Global', // REP-Global
  '0, 0, 5, 5, 3, 3, 0, 0, 3, 3, 5, 5': 'CRep-Local', // REP-Local

  // +++++++++++++++++
  //+++++ Experiment 2
  //
  // ----- 4 Tokens
  // Rotation +1 [0,1,2,3]
  // Zhang geometrical shape-23 [0,2,5,3]
  // Zhang geometrical shape-30 [0,3,5,2]

  // ----- Play 4 Tokens
  // Rotation +1 [0,1,2,3]
  '0, 1, 0, 2, 0, 3, 0, 1, 0, 2, 0, 3': 'Play4', // Play 4 Tokens
  '0, 1, 0, 2, 1, 3, 0, 1, 0, 2, 1, 3': 'CPlay4', // Contrôle Play-4 Tokens

  // Zhang geometrical shape-23 [0,2,5,3]
  '0, 2, 0, 5, 0, 3, 0, 2, 0, 5, 0, 3': 'Play4', // Play 4 Tokens
  '0, 2, 0, 5, 2, 3, 0, 2, 0, 5, 2, 3': 'CPlay4', // Contrôle Play-4 Tokens

  // Zhang geometrical shape-30 [0,3,2,5]
  '0, 3, 0, 2, 0, 5, 0, 3, 0, 2, 0, 5': 'Play4', // Play 4 Tokens
  '0, 3, 0, 2, 3, 5, 0, 3, 0, 2, 3, 5': 'CPlay4', // Contrôle Play-4 Tokens

  // ----- Sub-programs 2 (6 Tokens): treat it as 3 tokens
  // Rotation +1 [0,1,2,3]
  '0, 1, 2, 3, 0, 1, 2, 1, 0, 1, 2, 0': 'Sub-1', // Sub-programs 1
  '0, 1, 2, 3, 0, 2, 1, 2, 0, 1, 2, 0': 'CSub-1', // Contrôle sub-programs 1
  // Triangle + rotation [0,2,4] + [1,3,5]
  '0, 2, 4, 1, 0, 2, 4, 3, 0, 2, 4, 5': 'Sub-1', // Sub-programs 1
  '0, 2, 4, 1, 0, 4, 2, 3, 0, 2, 4, 5': 'CSub-1', // Contrôle sub-programs 1
  // Separated groups [0,5,3]+[1,2,4]
  '0, 5, 3, 1, 0, 5, 3, 2, 0, 5, 3, 4': 'Sub-1', // Sub-programs 1
  '0, 5, 3, 1, 0, 3, 5, 2, 0, 5, 3, 4': 'CSub-1', // Contrôle sub-programs 1

  // ----- Sub-programs 2 (6 Tokens): treat it as 3 tokens
  // Rotation +1
  '0, 1, 2, 3, 0, 1, 2, 4, 0, 1, 2, 5': 'Sub-2', // Sub-programs 2
  '0, 1, 2, 3, 0, 2, 1, 4, 0, 1, 2, 5': 'CSub-2', // Contrôle sub-programs 2
  // Triangle + rotation [0,2,4] + [1,3,5]
  '0, 2, 4, 1, 0, 2, 4, 3, 0, 2, 4, 5': 'Sub-2', // Sub-programs 2
  '0, 2, 4, 1, 0, 4, 2, 3, 0, 2, 4, 5': 'CSub-2', // Contrôle sub-programs 2
  // Separated groups [0,5,3]+[1,2,4]
  '0, 5, 3, 1, 0, 5, 3, 2, 0, 5, 3, 4': 'Sub-2', // Sub-programs 2
  '0, 5, 3, 1, 0, 3, 5, 2, 0, 5, 3, 4': 'CSub-2', // Contrôle sub-programs 2

  // ----- Indice i (2tokens)
  // - distance between two points = 1
  '0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1': 'Index', // Indice i
  '0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1': 'CIndex', // Contrôle indice i

  // - distance between two points = 2
  '0, 2, 0, 0, 2, 2, 0, 0, 0, 2, 2, 2': 'Index', // Indice i
  '0, 0, 0, 2, 2, 2, 0, 2, 0, 0, 2, 2': 'CIndex', // Contrôle indice i
  // - distance between two points = 3
  '0, 3, 0, 0, 3, 3, 0, 0, 0, 3, 3, 3': 'Index', // Indice i
  '0, 0, 0, 3, 3, 3, 0, 3, 0, 0, 3, 3': 'CIndex', // Contrôle indice i

  // ----- Play
  // Rotation +1 [0,1,2,3]
  '0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3': 'Play', // Play
  '0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 3': 'CPlay', // Contrôle play
  // Zhang geometrical shape-23 [0,2,5,3]
  '0, 0, 0, 2, 0, 0, 0, 5, 0, 0, 0, 3': 'Play', // Play
  '0, 0, 0, 2, 0, 0, 5, 0, 0, 0, 0, 3': 'CPlay', // Contrôle play
  // Zhang geometrical shape-30 [0,3,2,5]
  '0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 5': 'Play', // Play
  '0, 0, 0, 3, 0, 0, 2, 0, 0, 0, 0, 5': 'CPlay', // Contrôle play

  // Insertion/Suppression (5 Tokens): treat it as 3 +2
  // -- Rotation +1
  '0, 1, 2, 0, 1, 2, 3, 0, 1, 2, 3, 4': 'Insertion', // Insertion
  '0, 1, 2, 3, 4, 0, 1, 2, 3, 0, 1, 2': 'Suppression', // Suppression (contrôle insertion)
  // -- Triangle + rotation [0,2,4] + [1,3]
  '0, 2, 4, 0, 2, 4, 1, 0, 2, 4, 1, 3': 'Insertion', // Insertion
  '0, 2, 4, 1, 3, 0, 2, 4, 1, 0, 2, 4': 'Suppression', // Suppression (contrôle insertion)
  // -- 2 Groups [0,5,3]+[1,4]
  '0, 5, 3, 0, 5, 3, 1, 0, 5, 3, 1, 4': 'Insertion', // Insertion
  '0, 5, 3, 1, 4, 0, 5, 3, 1, 0, 5, 3': 'Suppression', // Suppression (contrôle insertion)

  // ----- Mirror 1
  // Rotation +1 [0,1,2,3]
  '0, 1, 2, 3, 3, 2, 1, 0, 0, 1, 2, 3': 'Mirror-1', // Mirror 1
  '0, 1, 2, 3, 3, 1, 2, 0, 0, 1, 2, 3': 'CMirror-1', // Contrôle Mirror 1
  // Zhang geometrical shape-23 [0,2,5,3]
  '0, 2, 5, 3, 3, 5, 2, 0, 0, 2, 5, 3': 'Mirror-1', // Mirror 1
  '0, 2, 5, 3, 3, 2, 5, 0, 0, 2, 5, 3': 'CMirror-1', // Contrôle Mirror 1
  // Zhang geometrical shape-30 [0,3,2,5]
  '0, 3, 2, 5, 5, 2, 3, 0, 0, 3, 2, 5': 'Mirror-1', // Mirror 1
  '0, 3, 2, 5, 5, 3, 2, 0, 0, 3, 2, 5': 'CMirror-1', // Contrôle Mirror 1

  // ----- Mirror 2
  // Rotation +1 [0,1,2,3]
  '0, 1, 2, 3, 2, 1, 0, 3, 0, 1, 2, 3': 'Mirror-2', // Mirror 2
  '0, 1, 2, 3, 2, 0, 1, 3, 0, 1, 2, 3': 'CMirror-2', // Contrôle Mirror 2
  // Zhang geometrical shape-23 [0,2,5,3]
  '0, 2, 5, 3, 5, 2, 0, 3, 0, 2, 5, 3': 'Mirror-2', // Mirror 2
  '0, 2, 5, 3, 5, 0, 2, 3, 0, 2, 5, 3': 'CMirror-2', // Contrôle Mirror 2
  // Zhang geometrical shape-30 [0,3,2,5]
  '0, 3, 2, 5, 2, 3, 0, 5, 0, 3, 2, 5': 'Mirror-2', // Mirror 2
  '0, 3, 2, 5, 2, 0, 3, 5, 0, 3, 2, 5': 'CMirror-2', // Contrôle Mirror 2

  '1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1': 'probe-easy', //probe-easy

  // ----- 6 Tokens
  '0, 3, 4, 1, 4, 1, 2, 5, 5, 3, 0, 2': 'probe-hard-1', //probe-hard, version 1
  '0, 1, 2, 3, 2, 3, 4, 5, 5, 1, 0, 4': 'probe-hard-2', //probe-hard, version 2
  '1, 2, 3, 4, 3, 4, 5, 0, 0, 2, 1, 5': 'probe-hard-3', //probe-hard, version 3
  '0, 1, 5, 2, 5, 2, 4, 3, 3, 1, 0, 4': 'probe-hard-4', //probe-hard, version 4
  '0, 1, 3, 4, 3, 4, 2, 5, 5, 1, 0, 2': 'probe-hard-5', //probe-hard, version 5
};

const sequence_tag_geometry = {
  /* Explanation
  --- 2-tokens
  dist-1: 2-tokens, distance between the two is 1.
  dist-2: 2-tokens, distance between the two is 2.
  dist-3: 2-tokens, distance between the two is 3.

  --- 3-tokens
  rot-1: 3-tokens (also 4-tokens), based on the operation rotation +1
  triangle: 3-tokens, based on the operation rotation +2 (which makes a triangle on the hexagon)
  2groups: 3-tokens, the tokens are split into two groups {0,5} and {3}

  --- 4-tokens
  rot-1: 4-tokens, based on the operation rotation +1
  zhang-23: 4-tokens, based on the article by Zhang, Liping Wang et al. (2022), figure 2, geometry-23
  zhang-30: 4-tokens, based on the article by Zhang, Liping Wang et al. (2022), figure 2, geometry-23


  */
  '0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0': 'training-1',
  '0, 3, 5, 1, 4, 3, 3, 2, 0, 5, 3, 0': 'training-2',
  '0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3': 'training-3',
  '1, 4, 5, 2, 5, 2, 3, 0, 0, 4, 1, 3': 'training-4',

  '0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1': 'dist-1',
  '0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1': 'dist-1', // CREP2

  // - distance between two points = 2
  '0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2': 'dist-2',
  '0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2': 'dist-2', // CREP2

  // - distance between two points = 3
  '0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3': 'dist-3',
  '0, 3, 3, 3, 3, 0, 0, 3, 0, 0, 0, 3': 'dist-3', // CREP2

  // ----- REP3
  // Rotation cluster form
  '0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2': 'rot-1', // REP3
  '0, 1, 2, 0, 2, 1, 1, 2, 0, 1, 0, 2': 'rot-1', // CREP3

  // Triangle + rotation form
  '0, 2, 4, 0, 2, 4, 0, 2, 4, 0, 2, 4': 'triangle', // REP3
  '0, 2, 4, 0, 4, 2, 2, 4, 0, 2, 0, 4': 'triangle', // CREP3

  // 2 groups
  '0, 5, 3, 0, 5, 3, 0, 5, 3, 0, 5, 3': '2groups', // REP3
  '0, 5, 3, 0, 3, 5, 5, 3, 0, 5, 0, 3': '2groups', // CREP3

  // ----- REP4
  // Rotation +1
  '0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3': 'rot-1', // REP4
  '0, 1, 2, 3, 2, 1, 3, 0, 0, 3, 1, 2': 'rot-1', // CREP4

  // Zhang geometrical shape-23
  '0, 2, 5, 3, 0, 2, 5, 3, 0, 2, 5, 3': 'zhang-23', // REP4
  '0, 2, 5, 3, 5, 2, 3, 0, 0, 3, 2, 5': 'zhang-23', // CREP4

  // Zhang geometrical shape-30
  '0, 3, 2, 5, 0, 3, 2, 5, 0, 3, 2, 5': 'zhang-30', // REP4
  '0, 3, 2, 5, 2, 3, 5, 0, 0, 5, 3, 2': 'zhang-30', // CREP4

  // ---- REP-Nested
  // Rotation +1
  '0, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2': 'rot-1', // REP-Nested
  '0, 1, 2, 0, 2, 1, 0, 1, 2, 0, 2, 1': 'rot-1', // REP-Global
  '0, 0, 1, 1, 2, 2, 0, 0, 2, 2, 1, 1': 'rot-1', // REP-Local

  // Triangle + rotation form
  '0, 0, 2, 2, 4, 4, 0, 0, 2, 2, 4, 4': 'triangle', // REP-Nested
  '0, 2, 4, 0, 4, 2, 0, 2, 4, 0, 4, 2': 'triangle', // REP-Global
  '0, 0, 2, 2, 4, 4, 0, 0, 4, 4, 2, 2': 'triangle', // REP-Local

  // 2 groups
  '0, 0, 5, 5, 3, 3, 0, 0, 5, 5, 3, 3': '2groups', // REP-Nested
  '0, 5, 3, 0, 3, 5, 0, 5, 3, 0, 3, 5': '2groups', // REP-Global
  '0, 0, 5, 5, 3, 3, 0, 0, 3, 3, 5, 5': '2groups', // REP-Local

  // +++++++++++++++++
  //+++++ Experiment 2
  //
  // ----- 4 Tokens
  // Rotation +1 [0,1,2,3]
  // Zhang geometrical shape-23 [0,2,5,3]
  // Zhang geometrical shape-30 [0,3,5,2]

  // ----- Play 4 Tokens
  // Rotation +1 [0,1,2,3]
  '0, 1, 0, 2, 0, 3, 0, 1, 0, 2, 0, 3': 'rot-1', // Play 4 Tokens
  '0, 1, 0, 2, 1, 3, 0, 1, 0, 2, 1, 3': 'rot-1', // Contrôle Play-4 Tokens

  // Zhang geometrical shape-23 [0,2,5,3]
  '0, 2, 0, 5, 0, 3, 0, 2, 0, 5, 0, 3': 'zhang-23', // Play 4 Tokens
  '0, 2, 0, 5, 2, 3, 0, 2, 0, 5, 2, 3': 'zhang-23', // Contrôle Play-4 Tokens

  // Zhang geometrical shape-30 [0,3,2,5]
  '0, 3, 0, 2, 0, 5, 0, 3, 0, 2, 0, 5': 'zhang-30', // Play 4 Tokens
  '0, 3, 0, 2, 3, 5, 0, 3, 0, 2, 3, 5': 'zhang-30', // Contrôle Play-4 Tokens

  // ----- Sub-programs 2 (6 Tokens): treat it as 3 tokens
  // Rotation +1 [0,1,2,3]
  '0, 1, 2, 3, 0, 1, 2, 1, 0, 1, 2, 0': 'rot-1', // Sub-programs 1
  '0, 1, 2, 3, 0, 2, 1, 2, 0, 1, 2, 0': 'rot-1', // Contrôle sub-programs 1
  // Triangle + rotation [0,2,4] + [1,3,5]
  '0, 2, 4, 1, 0, 2, 4, 3, 0, 2, 4, 5': 'triangle', // Sub-programs 1
  '0, 2, 4, 1, 0, 4, 2, 3, 0, 2, 4, 5': 'triangle', // Contrôle sub-programs 1
  // Separated groups [0,5,3]+[1,2,4]
  '0, 5, 3, 1, 0, 5, 3, 2, 0, 5, 3, 4': '2groups', // Sub-programs 1
  '0, 5, 3, 1, 0, 3, 5, 2, 0, 5, 3, 4': '2groups', // Contrôle sub-programs 1

  // ----- Sub-programs 2 (6 Tokens): treat it as 3 tokens
  // Rotation +1
  '0, 1, 2, 3, 0, 1, 2, 4, 0, 1, 2, 5': 'rot-1', // Sub-programs 2
  '0, 1, 2, 3, 0, 2, 1, 4, 0, 1, 2, 5': 'rot-1', // Contrôle sub-programs 2
  // Triangle + rotation [0,2,4] + [1,3,5]
  '0, 2, 4, 1, 0, 2, 4, 3, 0, 2, 4, 5': 'triangle', // Sub-programs 2
  '0, 2, 4, 1, 0, 4, 2, 3, 0, 2, 4, 5': 'triangle', // Contrôle sub-programs 2
  // Separated groups [0,5,3]+[1,2,4]
  '0, 5, 3, 1, 0, 5, 3, 2, 0, 5, 3, 4': '2groups', // Sub-programs 2
  '0, 5, 3, 1, 0, 3, 5, 2, 0, 5, 3, 4': '2groups', // Contrôle sub-programs 2

  // ----- Indice i (2tokens)
  // - distance between two points = 1
  '0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1': 'dist-1', // Indice i
  '0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1': 'dist-1', // Contrôle indice i

  // - distance between two points = 2
  '0, 2, 0, 0, 2, 2, 0, 0, 0, 2, 2, 2': 'dist-2', // Indice i
  '0, 0, 0, 2, 2, 2, 0, 2, 0, 0, 2, 2': 'dist-2', // Contrôle indice i
  // - distance between two points = 3
  '0, 3, 0, 0, 3, 3, 0, 0, 0, 3, 3, 3': 'dist-3', // Indice i
  '0, 0, 0, 3, 3, 3, 0, 3, 0, 0, 3, 3': 'dist-3', // Contrôle indice i

  // ----- Play
  // Rotation +1 [0,1,2,3]
  '0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3': 'dist-1', // Play
  '0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 3': 'dist-1', // Contrôle play
  // Zhang geometrical shape-23 [0,2,5,3]
  '0, 0, 0, 2, 0, 0, 0, 5, 0, 0, 0, 3': 'zhang-23', // Play
  '0, 0, 0, 2, 0, 0, 5, 0, 0, 0, 0, 3': 'zhang-23', // Contrôle play
  // Zhang geometrical shape-30 [0,3,2,5]
  '0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 5': 'zhang-30', // Play
  '0, 0, 0, 3, 0, 0, 2, 0, 0, 0, 0, 5': 'zhang-30', // Contrôle play

  // Insertion/Suppression (5 Tokens): treat it as 3 +2
  // -- Rotation +1
  '0, 1, 2, 0, 1, 2, 3, 0, 1, 2, 3, 4': 'rot-1', // Insertion
  '0, 1, 2, 3, 4, 0, 1, 2, 3, 0, 1, 2': 'rot-1', // Suppression (contrôle insertion)
  // -- Triangle + rotation [0,2,4] + [1,3]
  '0, 2, 4, 0, 2, 4, 1, 0, 2, 4, 1, 3': 'triangle', // Insertion
  '0, 2, 4, 1, 3, 0, 2, 4, 1, 0, 2, 4': 'triangle', // Suppression (contrôle insertion)
  // -- 2 Groups [0,5,3]+[1,4]
  '0, 5, 3, 0, 5, 3, 1, 0, 5, 3, 1, 4': '2groups', // Insertion
  '0, 5, 3, 1, 4, 0, 5, 3, 1, 0, 5, 3': '2groups', // Suppression (contrôle insertion)

  // ----- Mirror 1
  // Rotation +1 [0,1,2,3]
  '0, 1, 2, 3, 3, 2, 1, 0, 0, 1, 2, 3': 'rot-1', // Mirror 1
  '0, 1, 2, 3, 3, 1, 2, 0, 0, 1, 2, 3': 'rot-1', // Contrôle Mirror 1
  // Zhang geometrical shape-23 [0,2,5,3]
  '0, 2, 5, 3, 3, 5, 2, 0, 0, 2, 5, 3': 'zhang-23', // Mirror 1
  '0, 2, 5, 3, 3, 2, 5, 0, 0, 2, 5, 3': 'zhang-23', // Contrôle Mirror 1
  // Zhang geometrical shape-30 [0,3,2,5]
  '0, 3, 2, 5, 5, 2, 3, 0, 0, 3, 2, 5': 'zhang-30', // Mirror 1
  '0, 3, 2, 5, 5, 3, 2, 0, 0, 3, 2, 5': 'zhang-30', // Contrôle Mirror 1

  // ----- Mirror 2
  // Rotation +1 [0,1,2,3]
  '0, 1, 2, 3, 2, 1, 0, 3, 0, 1, 2, 3': 'rot-1', // Mirror 2
  '0, 1, 2, 3, 2, 0, 1, 3, 0, 1, 2, 3': 'rot-1', // Contrôle Mirror 2
  // Zhang geometrical shape-23 [0,2,5,3]
  '0, 2, 5, 3, 5, 2, 0, 3, 0, 2, 5, 3': 'zhang-23', // Mirror 2
  '0, 2, 5, 3, 5, 0, 2, 3, 0, 2, 5, 3': 'zhang-23', // Contrôle Mirror 2
  // Zhang geometrical shape-30 [0,3,2,5]
  '0, 3, 2, 5, 2, 3, 0, 5, 0, 3, 2, 5': 'zhang-30', // Mirror 2
  '0, 3, 2, 5, 2, 0, 3, 5, 0, 3, 2, 5': 'zhang-30', // Contrôle Mirror 2

  '1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1': 'probe-easy', //probe-easy

  // ----- 6 Tokens
  '0, 3, 4, 1, 4, 1, 2, 5, 5, 3, 0, 2': 'probe-hard-1', //probe-hard, version 1
  '0, 1, 2, 3, 2, 3, 4, 5, 5, 1, 0, 4': 'probe-hard-2', //probe-hard, version 2
  '1, 2, 3, 4, 3, 4, 5, 0, 0, 2, 1, 5': 'probe-hard-3', //probe-hard, version 3
  '0, 1, 5, 2, 5, 2, 4, 3, 3, 1, 0, 4': 'probe-hard-4', //probe-hard, version 4
  '0, 1, 3, 4, 3, 4, 2, 5, 5, 1, 0, 2': 'probe-hard-5', //probe-hard, version 5
};
