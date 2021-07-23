const IconPark = ({ size = 28, color, stroke, fill, className, ...rest }) => (
  <>
    <iconpark-icon
      class={className}
      color={color}
      size={size}
      stroke={stroke}
      fill={fill}
      {...rest}
    />
  </>
)
export default IconPark
