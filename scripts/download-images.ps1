# Descarga fotos curadas de Unsplash a public/images/
# Atribución: las fotos son de Unsplash bajo Unsplash License.
$ErrorActionPreference = 'Continue'
$ProgressPreference = 'SilentlyContinue'

function Save-Image {
  param([string]$Id, [string]$Path, [int]$Width = 1200)
  $url = "https://images.unsplash.com/photo-$Id" + "?auto=format&fit=crop&w=$Width&q=80"
  try {
    Invoke-WebRequest -Uri $url -OutFile $Path -UseBasicParsing -TimeoutSec 45
    $size = [math]::Round((Get-Item $Path).Length / 1KB)
    Write-Host "OK  $Path ($size KB)"
  } catch {
    Write-Host "FAIL $Path : $($_.Exception.Message)"
  }
}

# Hero (atmospheric warm dining room)
Save-Image "1559339352-11d035aa65de" "public/images/hero/dining-warm.jpg" 1800
Save-Image "1517248135467-4c7edcad34c4" "public/images/hero/dining-alt.jpg" 1800

# Platos (intentamos IDs curados de comida española/gallega)
$dishes = @{
  "pulpo-a-la-gallega"  = "1559827260-dc66d52bef19"
  "raxo-al-queso"       = "1544025162-d76694265947"
  "zorza"               = "1574484284002-952d92456975"
  "ensalada-campera"    = "1607013251379-e6eecfffe234"
  "tortilla-de-patata"  = "1599974579688-8dbdd335c77f"
  "pinchos-variados"    = "1543353071-873f17a7a088"
  "bocadillos-calientes"= "1528735602780-2552fd46c7af"
  "mariscos-temporada"  = "1565280654386-466bd2495e9b"
  "combinado-clasico"   = "1525351484163-7529414344d8"
  "hamburguesa-casa"    = "1568901346375-23c9450c58cd"
  "helados-artesanos"   = "1488900128323-21503983a07e"
}
foreach ($k in $dishes.Keys) {
  Save-Image $dishes[$k] "public/images/dishes/$k.jpg" 1000
}

# Gallery (9 imágenes ambiente)
$gallery = @(
  "1517248135467-4c7edcad34c4",
  "1546069901-ba9599a7e63c",
  "1551782450-a2132b4ba21d",
  "1559339352-11d035aa65de",
  "1577106263724-2c8e03bfe9cf",
  "1559847844-5315695dadae",
  "1414235077428-338989a2e8c0",
  "1467003909585-2f8a72700288",
  "1592861956120-e524fc739696"
)
for ($i = 0; $i -lt $gallery.Length; $i++) {
  $num = ($i + 1).ToString("00")
  Save-Image $gallery[$i] "public/images/gallery/g$num.jpg" 1000
}

# Equipo (3 imágenes: cocina, sala, barra)
$team = @{
  "cocina" = "1577106263724-2c8e03bfe9cf"
  "sala"   = "1559339352-11d035aa65de"
  "barra"  = "1572116469696-31de0f17cc34"
}
foreach ($k in $team.Keys) {
  Save-Image $team[$k] "public/images/team/$k.jpg" 1000
}
