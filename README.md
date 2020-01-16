# Spotify Playlists
Aplikacja angularowa + Rest Api w .NET Core z wykorzystaniem Spotify Web API do tworzenia własnych playlist.

[![SpotifyPlaylists](https://arturkania.files.wordpress.com/2020/01/spotifyplaylists_2.png?w=2000&h=&crop=1 "SpotifyPlaylists")](https://arturkania.files.wordpress.com/2020/01/spotifyplaylists_2.png?w=2000&h=&crop=1 "SpotifyPlaylists")

## Możliwości aplikacji:
* tworzenie/edycja własnych playlist (nazwa, opis, wybór kategorii z API, kolor, opcja ulubione),
* wyszukiwanie albumów poprzez Spotify Web API. Wyszukiwarka korzysta z rxjs i wysyła request dopiero po 3 sekundach,
* podgląd oraz odsłuchanie utworów w albumie,
* dodawanie utworów do swoich utworzonych playlist,
* usuwanie utworów z playlist lub całych playlist.

## Najważniejsze informacje:
* strona jest w pełni responsywna (RWD),
* wykorzystuje Streamy (biblioteka rxjs),
* wykorzystuje Bootstrap 4,
* korzysta z Spotify Web API + Swagger w wersji 4.0.1,
* backend napisany w .NET Core (Restful Api),
* baza danych sqlite.

## Najważniejsze wykorzystane biblioteki
```
@angular/core: ^4.2.0, @angular/router: ^4.2.0,  @angular/cli: 1.2.0, rxjs: ^5.1.0, bootstrap: ^4.0.0-alpha.6, font-awesome: ^4.7.0, jquery: ^3.4.1, typescript: ~2.2.0
```
