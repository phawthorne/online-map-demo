import os
import glob
import shutil


country_name = "Germany"
raster_files = glob.glob(os.path.join(country_name, 'source_maps', '*.tif'))
for raster_file in raster_files:
    vrt_file = os.path.splitext(raster_file)[0] + '.vrt'
    cmd = f"gdal_translate -of vrt -expand rgba {raster_file} {vrt_file}"
    os.system(cmd)
    output_dir = os.path.join(country_name, 
                              os.path.splitext(os.path.basename(raster_file))[0])
    cmd = f"gdal2tiles.py -r near --processes=12 {vrt_file} {output_dir}"
    os.system(cmd)