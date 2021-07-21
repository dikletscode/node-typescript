export const insertMusicQuery = `INSERT INTO tb_tracks(track_name,singer,
 album,duration,thumbnail)
  VALUES(?,?,?,?,?)
  `;
